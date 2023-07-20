// LogOut logs out the user by removing their authorization and clearing their cookies.
// It first verifies the refresh token and access token, then finds the corresponding authorization.
// If the user ID in the authorization does not match the user ID in the access token, returns unauthorized.
// Finally, removes the authorization and clears the cookies.
package Authentication

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/controllers/CRefreshToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CActivity"
	"clipcap/web/pkg/controllers/CAuthorization"
	"clipcap/web/pkg/controllers/CLog"

	"github.com/gin-gonic/gin"
)

func LogOut(c *gin.Context) {
	refresh_token := c.Request.Header.Get("Refresh")
	access_token := c.Request.Header.Get("Authorization")

	RefreshToken, err := CRefreshToken.Verify(refresh_token)
	if err != nil {
		CLog.Console("Invalid refresh token")
		c.JSON(401, responses.AuthenticationWrongAuthorization())
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		CLog.Console("Invalid access token")
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	Authorization, err := CAuthorization.FindById(RefreshToken.AuthorizationId)
	if err != nil {
		CLog.Console("Can't find Authorization in DB")
		c.JSON(401, responses.AuthenticationWrongAuthorization())
		c.Abort()
		return
	}

	if Authorization.UserId != AccessToken.UserID {
		CLog.Console("Authorization userId mismatch with token userId")
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	if err := CAuthorization.RemoveById(Authorization.ID); err != nil {
		c.JSON(500, responses.AuthenticationFailedToRemoveAuthorization(err.Error()))
		c.Abort()
		return
	}

	/*
		c.SetSameSite(http.SameSiteNoneMode)
		c.SetCookie("refresh_token", "", 0, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
		c.SetCookie("access_token", "", 0, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
	*/

	c.JSON(200, responses.SystemServerSuccess())
	c.Abort()

	CActivity.Create([]interface{}{AccessToken.UserID}, AccessToken.UserID, "Logged Out", "")
}
