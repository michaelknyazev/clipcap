package HFacts

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/shared/types"
	"clipcap/pkg/summary-extension/controllers/CFact"

	"github.com/gin-gonic/gin"
)

func GetCurrent(c *gin.Context) {
	Logger := SLog.Init()
	access_token := c.Request.Header.Get("Authorization")
	Logger.Log("Received access token, verifying the authorization")

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		Logger.Log("Invalid access token! Error: %s", err.Error())
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}
	Logger.Log("[%s] Received Valid access token.", AccessToken.UserID)

	Facts, err := CFact.GetUserFactsForCurrentDay(AccessToken.UserID)
	if err != nil {
		Logger.Log("[%s] Can't Get User Facts from DB. Error: %s", AccessToken.UserID, err.Error())
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
