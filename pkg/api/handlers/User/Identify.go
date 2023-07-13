package User

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CUser"

	"github.com/gin-gonic/gin"
)

func Identify(c *gin.Context) {
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

	User, err := CUser.FindById(AccessToken.UserID)
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccessWithData(User))
	c.Abort()
}
