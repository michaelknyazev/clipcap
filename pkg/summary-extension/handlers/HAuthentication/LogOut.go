// LogOut logs out the user by removing their authorization and clearing their cookies.
// It first verifies the refresh token and access token, then finds the corresponding authorization.
// If the user ID in the authorization does not match the user ID in the access token, returns unauthorized.
// Finally, removes the authorization and clears the cookies.
package HAuthentication

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CAuthorization"
	"clipcap/pkg/shared/controllers/CLog"
	"clipcap/pkg/shared/controllers/CRefreshToken"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func LogOut(c *gin.Context) {
	refresh_token := c.Request.Header.Get("Refresh")
	access_token := c.Request.Header.Get("Authorization")

	RefreshToken, err := CRefreshToken.Verify(refresh_token)
	if err != nil {
		CLog.Console("Invalid refresh token")
		c.JSON(401, types.TResponse{false, "REFRESH_TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Verify(access_token)
	if err != nil {
		CLog.Console("Invalid access token")
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	Authorization, err := CAuthorization.FindById(RefreshToken.AuthorizationId)
	if err != nil {
		CLog.Console("Can't find Authorization in DB")
		c.JSON(401, types.TResponse{false, "AUTHORIZATION_FIND_FAILED", nil})
		c.Abort()
		return
	}

	if Authorization.UserId != AccessToken.UserID {
		CLog.Console("Authorization userId mismatch with token userId")
		c.JSON(401, types.TResponse{false, "AUTHORIZATION_USER_MISMATCH", nil})
		c.Abort()
		return
	}

	if err := CAuthorization.RemoveById(Authorization.ID); err != nil {
		c.JSON(500, types.TResponse{false, "AUTHORIZATION_REMOVE_FAILED", nil})
		c.Abort()
		return
	}

	/*
		c.SetSameSite(http.SameSiteNoneMode)
		c.SetCookie("refresh_token", "", 0, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
		c.SetCookie("access_token", "", 0, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
	*/

	c.JSON(200, types.TResponse{true, "SUCCESS", nil})
	c.Abort()

	CActivity.Create([]interface{}{AccessToken.UserID}, AccessToken.UserID, "Logged Out", "")
}
