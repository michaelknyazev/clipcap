// Refresh generates a new refresh token and access token for the given user.
// It first verifies the existing refresh token and uses the associated authorization to generate new tokens.
// It sets the new refresh token and access token as cookies and returns a success response.
// It also creates a new activity log for the user indicating that the authorization was renewed.
package Authentication

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/controllers/CRefreshToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CActivity"
	"clipcap/web/pkg/controllers/CAuthorization"
	"clipcap/web/pkg/controllers/CUser"

	"github.com/gin-gonic/gin"
)

func Refresh(c *gin.Context) {
	refresh_token := c.Request.Header.Get("Refresh")
	RefreshTokenOld, err := CRefreshToken.Verify(refresh_token)
	if err != nil {
		c.JSON(401, responses.AuthenticationWrongAuthorization())
		c.Abort()
		return
	}

	Authorization, err := CAuthorization.FindById(RefreshTokenOld.AuthorizationId)
	if err != nil {
		c.JSON(401, responses.AuthenticationWrongAuthorization())
		c.Abort()
		return
	}

	User, err := CUser.FindById(Authorization.UserId)
	if err != nil {
		c.JSON(401, responses.AuthenticationUserDoesNotExist())
		c.Abort()
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, &types.RefreshToken{
		AuthorizationId: Authorization.ID,
	})
	if err != nil {
		c.JSON(500, responses.AuthenticationGenerateRefreshTokenFailed(err.Error()))
		c.Abort()
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, &types.AccessToken{
		UserID: User.ID,
	})
	if err != nil {
		c.JSON(500, responses.AuthenticationGenerateAccessTokenFailed(err.Error()))
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

	c.JSON(200, responses.SystemServerSuccessWithData(TokensData))
	c.Abort()

	CActivity.Create([]interface{}{User.ID}, User.ID, "renewed authorization", "")
}
