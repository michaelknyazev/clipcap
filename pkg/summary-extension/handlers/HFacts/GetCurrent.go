package HFacts

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CLog"
	"clipcap/pkg/shared/types"
	"clipcap/pkg/summary-extension/controllers/CFact"

	"github.com/gin-gonic/gin"
)

func GetCurrent(c *gin.Context) {
	access_token := c.Request.Header.Get("Authorization")
	CLog.Log("Received access token, verifying the authorization")

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		CLog.Log("Invalid access token!", err.Error())
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}
	CLog.Log(AccessToken.UserID, "Received Valid access token.")

	Facts, err := CFact.GetUserFactsForCurrentMonth(AccessToken.UserID)
	if err != nil {
		CLog.Log("Invalid access token!", err.Error())
		c.JSON(500, types.TResponse{false, "FACTS_FIND_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", map[string]interface{}{
		"current_month": len(Facts),
		"available":     10,
	}})
	c.Abort()
	return
}
