package Summarize

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CGPT"
	"clipcap/web/pkg/controllers/CLog"
	"clipcap/web/pkg/controllers/CSource"
	"clipcap/web/pkg/controllers/CSummary"
	"clipcap/web/pkg/controllers/CText"
	"clipcap/web/pkg/services/SGoogle"
	"fmt"

	"github.com/gin-gonic/gin"
)

func Youtube(c *gin.Context) {
	videoId := c.Query("videoId")
	if videoId == "" {
		CLog.Log("No Video ID received")
		c.JSON(404, responses.SystemNotFound())
		c.Abort()
		return
	}

	CLog.Log(videoId, "Received videoId summary request")

	access_token := c.Request.Header.Get("Authorization")
	CLog.Log(videoId, "Received access token, verifying the authorization")

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		CLog.Log(videoId, "Invalid access token!", err.Error())
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}
	CLog.Log(videoId, AccessToken.UserID, "Received Valid access token.")

	ExistingSummary, err := CSummary.FindBySourceId(videoId)
	if err == nil && len(ExistingSummary) > 0 {
		CLog.Log(videoId, AccessToken.UserID, "Summary already exists in DB")
		c.JSON(200, responses.SystemServerSuccessWithData(ExistingSummary))
		c.Abort()
		return
	}

	CLog.Log(videoId, AccessToken.UserID, "It's a new summary, processing")

	VideoData, err := SGoogle.GetVideoInfo(videoId)
	if err != nil {
		CLog.Log(videoId, AccessToken.UserID, "Can't Get video data from youtube!")
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	CLog.Log(videoId, AccessToken.UserID, "Received video data from youtube.")

	Source, err := CSource.FindOneBySourceId(videoId)
	if err != nil {
		CLog.Log(videoId, AccessToken.UserID, "It's a new video, creating a source in DB.")
		Source, err = CSource.Create("youtube", videoId, fmt.Sprintf("https://www.youtube.com/watch?v=%s", videoId))
		if err != nil {
			CLog.Log(videoId, AccessToken.UserID, "Can't create a source in DB", err.Error())

			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
	} else {
		CLog.Log(videoId, AccessToken.UserID, "It's an old video, skipping creating the source in DB.")
	}

	SourceContent, err := CText.FindBySourceId(videoId)
	if err != nil || len(SourceContent) == 0 {
		CLog.Log(videoId, AccessToken.UserID, "There is no source content stored in DB, fetching from youtube.")

		Captions, language, err := SGoogle.GetCaptionsFromVideoInfo(VideoData)
		if err != nil {
			CLog.Log(videoId, AccessToken.UserID, "Can't get captions from youtube.", err.Error())

			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		CLog.Log(videoId, AccessToken.UserID, "Got captions from youtube.", fmt.Sprintf("Captions len: %d", len(Captions.TextEntries)))

		SourceContent, err = CText.CreateMany(Source.SourceID, Captions.TextEntries, language)
		if err != nil {
			CLog.Log(videoId, AccessToken.UserID, "Can't save captions in DB!", err.Error())

			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
		CLog.Log(videoId, AccessToken.UserID, "Captions stored in DB.", fmt.Sprintf("Captions len: %d", len(SourceContent)))
	} else {
		CLog.Log(videoId, AccessToken.UserID, "Found source text captions content in DB.", fmt.Sprintf("Stored captions len: %d", len(SourceContent)))
	}

	Chunks := CGPT.PrepareTextFromSource(SourceContent)
	CLog.Log(videoId, AccessToken.UserID, "Splitted text into chunks", fmt.Sprintf("Chunks count: %d", len(Chunks)))

	CLog.Log(videoId, AccessToken.UserID, "Summarizing the text")
	GPTSummary, err := CGPT.SummarizeFromChunks(Chunks)
	if err != nil {
		CLog.Log(videoId, AccessToken.UserID, "Can't summarize chunks", err.Error())
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}
	CLog.Log(videoId, AccessToken.UserID, "Summary successfully generated.", fmt.Sprintf("Generated summaries len: %d", len(GPTSummary)))

	Summary, err := CSummary.CreateMany(videoId, GPTSummary)
	if err != nil {
		CLog.Log(videoId, AccessToken.UserID, "Can't save summary in DB", err.Error())
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	CLog.Log(videoId, AccessToken.UserID, "Summary saved.", fmt.Sprintf("Saved items len: %d", len(Summary)))

	c.JSON(200, responses.SystemServerSuccessWithData(Summary))
	c.Abort()
	return
}
