package HUser

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func Identify(c *gin.Context) {
	access_token, err := c.Cookie("access_token")
	if err != nil {
		c.JSON(401, types.TResponse{false, "TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		c.JSON(401, types.TResponse{false, "TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	User, err := CUser.FindById(AccessToken.UserID)
	if err != nil {
		c.JSON(401, types.TResponse{false, "USER_FIND_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", User})
	c.Abort()
}
