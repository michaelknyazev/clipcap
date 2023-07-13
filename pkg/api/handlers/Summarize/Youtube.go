package Summarize

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CIntegration"
	"clipcap/web/pkg/controllers/CSource"
	"clipcap/web/pkg/controllers/CText"
	"clipcap/web/pkg/services/SGoogle"
	"fmt"

	"github.com/gin-gonic/gin"
)

func Youtube(c *gin.Context) {
	videoId := c.Query("videoId")
	if videoId == "" {
		c.JSON(404, responses.SystemNotFound())
		c.Abort()
		return
	}

	access_token, err := c.Cookie("access_token")
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	Integration, err := CIntegration.FindByUserIdAndType(AccessToken.UserID, "google_oauth")
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	OAuthToken, err := CIntegration.OAuthToken(Integration)
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	VideoData, err := SGoogle.GetVideoInfo(OAuthToken, videoId)
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	Source, err := CSource.Create("youtube", videoId, fmt.Sprintf("https://www.youtube.com/watch?v=%s", videoId))
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	Captions, err := SGoogle.GetCaptionsFromVideoInfo(OAuthToken, VideoData)
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	SourceContent, err := CText.CreateMany(Source.SourceID, Captions.TextEntries)
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	c.JSON(200, SourceContent)
	c.Abort()
	return
}
