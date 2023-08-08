// Refresh generates a new refresh token and access token for the given user.
// It first verifies the existing refresh token and uses the associated authorization to generate new tokens.
// It sets the new refresh token and access token as cookies and returns a success response.
// It also creates a new activity log for the user indicating that the authorization was renewed.
package HAuthentication

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CAuthorization"
	"clipcap/pkg/shared/controllers/CRefreshToken"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func Refresh(c *gin.Context) {
	refresh_token := c.Request.Header.Get("Refresh")
	RefreshTokenOld, err := CRefreshToken.Verify(refresh_token)
	if err != nil {
		c.JSON(401, types.TResponse{false, "REFRESH_TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	Authorization, err := CAuthorization.FindById(RefreshTokenOld.AuthorizationId)
	if err != nil {
		c.JSON(401, types.TResponse{false, "AUTHORIZATION_FIND_FAILED", nil})
		c.Abort()
		return
	}

	User, err := CUser.FindById(Authorization.UserId)
	if err != nil {
		c.JSON(401, types.TResponse{false, "USER_FIND_FAILED", nil})
		c.Abort()
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, types.TRefreshToken{Authorization.ID})
	if err != nil {
		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, types.TAccessToken{User.ID})
	if err != nil {
		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
		c.Abort()
		return
	}

	/*
		c.SetCookie("refresh_token", RefreshToken, 60*60*24*7, "/", "*", SConfiguration.Configuration.IsProduction, true)
		c.SetCookie("access_token", AccessToken, 60*60, "/", "*", SConfiguration.Configuration.IsProduction, true)
	*/
	TokensData := struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
	}{AccessToken, RefreshToken}

	c.JSON(200, types.TResponse{true, "SUCCESS", TokensData})
	c.Abort()

	CActivity.Create([]interface{}{User.ID}, User.ID, "renewed authorization", "")
}
