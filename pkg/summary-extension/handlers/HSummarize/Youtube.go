package HSummarize

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/services/SGoogle"
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/shared/types"
	"clipcap/pkg/summary-extension/controllers/CChunk"
	"clipcap/pkg/summary-extension/controllers/CFact"
	"clipcap/pkg/summary-extension/controllers/CGPT"
	"clipcap/pkg/summary-extension/controllers/CSource"
	"clipcap/pkg/summary-extension/controllers/CSubscription"
	"clipcap/pkg/summary-extension/controllers/CSummary"
	"clipcap/pkg/summary-extension/controllers/CText"
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func Youtube(c *gin.Context) {
	Logger := SLog.Init()
	videoId := c.Query("videoId")
	if videoId == "" {
		Logger.Log("No Video ID received")
		c.JSON(404, types.TResponse{false, "VIDEOID_MISSING", nil})
		c.Abort()
		return
	}

	Logger.Log("[VideoID: %s] Received videoId summary request", videoId)

	access_token := c.Request.Header.Get("Authorization")
	Logger.Log("[VideoID: %s] Received access token, verifying the authorization", videoId)

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		Logger.Log("[VideoID: %s] Invalid access token! Error: %s", videoId, err.Error())
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}
	Logger.Log("[VideoID: %s] [UserID: %s] Received Valid access token.", videoId, AccessToken.UserID)

	UserFacts, err := CFact.GetUserFactsForCurrentDay(AccessToken.UserID)
	if err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] Can't get Facts for User. Error: %s", videoId, AccessToken.UserID, err.Error())
		c.JSON(500, types.TResponse{false, "SERVER_ERROR", nil})
		c.Abort()
		return
	}

	Logger.Log("[VideoID: %s] [UserID: %s] Found %d Facts for user in current month", videoId, AccessToken.UserID, len(UserFacts))

	CanCreateSummary := false

	MAX_FREE_SUMMARIES_PER_DAY := int(SConfiguration.Configuration.Miscellaneous.MaxFreeSummariesPerDay)

	ts := time.Now()
	Subscription, err := CSubscription.FindActiveByUserId(AccessToken.UserID)
	if err != nil && len(UserFacts) >= MAX_FREE_SUMMARIES_PER_DAY {
		// If there is no subscription and there were MAX_FREE_SUMMARIES_PER_DAY user facts in this day already
		Logger.Log("[VideoID: %s] [UserID: %s] There isn't any subscription for user %s in database", videoId, AccessToken.UserID, AccessToken.UserID)
		CanCreateSummary = false
	} else if Subscription.Expires <= ts.Unix() && len(UserFacts) >= MAX_FREE_SUMMARIES_PER_DAY {
		// If there is a subscription, but it's expired and there wer MAX_FREE_SUMMARIES_PER_DAY user facts in this day already
		Logger.Log("[VideoID: %s] [UserID: %s] There isn't any active subscription for user %s", videoId, AccessToken.UserID, AccessToken.UserID)

		CanCreateSummary = false
	} else if len(UserFacts) < MAX_FREE_SUMMARIES_PER_DAY {
		// If there were less then MAX_FREE_SUMMARIES user facts in this day
		Logger.Log("[VideoID: %s] [UserID: %s] User %s created less then %d summaries in current day", videoId, AccessToken.UserID, AccessToken.UserID, MAX_FREE_SUMMARIES_PER_DAY)

		CanCreateSummary = true
	} else {
		// If There is an active subscription
		Logger.Log("[VideoID: %s] [UserID: %s] There is an active subscription for user %s in database", videoId, AccessToken.UserID, AccessToken.UserID)

		CanCreateSummary = true
	}

	if !CanCreateSummary {
		Logger.Log("[VideoID: %s] [UserID: %s] There no active subscription found for user and there is more then %d facts for this user in current day", videoId, AccessToken.UserID, MAX_FREE_SUMMARIES_PER_DAY)
		c.JSON(422, types.TResponse{false, "LIMIT_REACHED", nil})
		c.Abort()
		return
	}

	Source, err := CSource.FindOneBySourceId(videoId)
	if err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] It's a new video, creating a source in DB.", videoId, AccessToken.UserID)
		Source, err = CSource.Create("youtube", videoId, fmt.Sprintf("https://www.youtube.com/watch?v=%s", videoId))
		if err != nil {
			Logger.Log("[VideoID: %s] [UserID: %s] Can't create a source in DB. Error: %s", videoId, AccessToken.UserID, err.Error())

			c.JSON(500, types.TResponse{false, "DATABASE_CREATE_FAILED", nil})
			c.Abort()
			return
		}
	} else {
		Logger.Log("[VideoID: %s] [UserID: %s] It's an old video, skipping creating the source in DB.", videoId, AccessToken.UserID)
	}

	Logger.Log("[VideoID: %s] [UserID: %s] Creating a fact for user", videoId, AccessToken.UserID)
	if _, err := CFact.Create(AccessToken.UserID, Source.ID); err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] Can't create a fact for user. Error: %s", videoId, AccessToken.UserID, err.Error())
		c.JSON(500, types.TResponse{false, "FACT_CREATE_FAILED", nil})
		c.Abort()
		return
	}

	ExistingSummary, err := CSummary.FindBySourceId(Source.ID)
	if err == nil && len(ExistingSummary) > 0 {
		Logger.Log("[VideoID: %s] [UserID: %s] Summary already exists in DB", videoId, AccessToken.UserID)
		c.JSON(200, types.TResponse{true, "SUMMARY_FOUND", ExistingSummary})
		c.Abort()
		return
	}

	Logger.Log("[VideoID: %s] [UserID: %s] It's a new summary, processing", videoId, AccessToken.UserID)

	VideoData, err := SGoogle.GetVideoInfo(videoId)
	if err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] Can't Get video data from youtube!", videoId, AccessToken.UserID)
		c.JSON(401, types.TResponse{false, "YOUTUBE_UNAUTHORIZED", nil})
		c.Abort()
		return
	}

	Logger.Log("[VideoID: %s] [UserID: %s] Received video data from youtube.", videoId, AccessToken.UserID)

	SourceContent, err := CText.FindBySourceId(Source.ID)
	if err != nil || len(SourceContent) == 0 {
		Logger.Log("[VideoID: %s] [UserID: %s] There is no source content stored in DB, fetching from youtube.", videoId, AccessToken.UserID)

		Captions, language, err := SGoogle.GetCaptionsFromVideoInfo(VideoData)
		if err != nil {
			Logger.Log("[VideoID: %s] [UserID: %s] Can't get captions from youtube.", videoId, AccessToken.UserID, err.Error())

			c.JSON(500, types.TResponse{false, "YOUTUBE_READ_FAILED", nil})
			c.Abort()
			return
		}

		Logger.Log("[VideoID: %s] [UserID: %s] Got captions from youtube. Captions len: %d", videoId, AccessToken.UserID, len(Captions.TextEntries))

		SourceContent, err = CText.CreateMany(Source.ID, Captions.TextEntries, language)
		if err != nil {
			Logger.Log("[VideoID: %s] [UserID: %s] Can't save captions in DB!. Error: %s", videoId, AccessToken.UserID, err.Error())

			c.JSON(500, types.TResponse{false, "DATABASE_CREATE_FAILED", nil})
			c.Abort()
			return
		}
		Logger.Log("[VideoID: %s] [UserID: %s] Captions stored in DB. Captions len: %d", videoId, AccessToken.UserID, len(SourceContent))
	} else {
		Logger.Log("[VideoID: %s] [UserID: %s] Found source text captions content in DB. Stored captions len: %d", videoId, AccessToken.UserID, len(SourceContent))
	}

	Chunks, err := CChunk.FindBySourceId(Source.ID)
	if err != nil || len(Chunks) == 0 {
		Logger.Log("[VideoID: %s] [UserID: %s] There is no saved chunks in DB, preparing..", videoId, AccessToken.UserID)

		PreparedChunks := CChunk.ConvertSource(SConfiguration.Configuration.Language, Source.ID, SourceContent)
		Logger.Log("[VideoID: %s] [UserID: %s] Converted source content into chunks Chunks count: %d", videoId, AccessToken.UserID, len(PreparedChunks))

		RewritedChunks, err := CChunk.RewriteContent(Logger, PreparedChunks, CGPT.CreateChatCompletion_GPT_3_5_16K)
		if err != nil {
			Logger.Log("[VideoID: %s] [UserID: %s] Can't rewrite chunks. Error: %s", videoId, AccessToken.UserID, err.Error())
			c.JSON(500, types.TResponse{false, "CHUNKS_REWRITE_FAILED", nil})
			c.Abort()
			return
		}

		Logger.Log("[VideoID: %s] [UserID: %s] Rewrited all chunks with GPT.", videoId, AccessToken.UserID)

		Chunks, err = CChunk.CreateMany(Source.ID, RewritedChunks)
		if err != nil {
			Logger.Log("[VideoID: %s] [UserID: %s] Can't save chunks in DB. Error: %s", videoId, AccessToken.UserID, err.Error())
			c.JSON(500, types.TResponse{false, "CHUNKS_CREATE_FAILED", nil})
			c.Abort()
			return
		}

		Logger.Log("[VideoID: %s] [UserID: %s] Saved %d chunks in DB", videoId, AccessToken.UserID, len(Chunks))
	} else {
		Logger.Log("[VideoID: %s] [UserID: %s] Found saved chunks in DB. Chunks count: %d", videoId, AccessToken.UserID, len(Chunks))
	}

	Logger.Log("[VideoID: %s] [UserID: %s] Summarizing the text", videoId, AccessToken.UserID)
	GPTSummary, err := CSummary.GenerateFromChunks(Logger, Chunks, CGPT.CreateFunctionCallChat_GPT_3_5_16k)
	if err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] Can't summarize chunks. %s", videoId, AccessToken.UserID, err.Error())
		c.JSON(500, types.TResponse{false, "GPT_SUMMARIZE_FAILED", nil})
		c.Abort()
		return
	}
	Logger.Log("[VideoID: %s] [UserID: %s] Summary successfully generated. Generated summaries len: %d", videoId, AccessToken.UserID, len(GPTSummary))

	Summary, err := CSummary.CreateMany(GPTSummary)
	if err != nil {
		Logger.Log("[VideoID: %s] [UserID: %s] Can't save summary in DB. Error: %s", videoId, AccessToken.UserID, err.Error())
		c.JSON(500, types.TResponse{false, "DATABASE_CREATE_FAILED", nil})
		c.Abort()
		return
	}

	Logger.Log("[VideoID: %s] [UserID: %s]  Summary saved. Saved items len: %d", videoId, AccessToken.UserID, len(Summary))

	c.JSON(200, types.TResponse{true, "SUMMARY_SUCCESS", Summary})
	c.Abort()
	return
}
