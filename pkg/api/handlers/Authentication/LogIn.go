// LogIn handles the POST request to login and generate an access token and a refresh token.
// It takes the user's email and password from the request body and validates them.
// If the credentials are valid, it creates an authorization and generates a refresh token and an access token.
// It then sets the refresh token and access token cookies in the response and returns a success response.
// If there is an error, it returns an appropriate error response and aborts the request.
// If the credentials are invalid, it creates a failed login activity and returns an appropriate error response.
package Authentication

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/controllers/CRefreshToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CActivity"
	"clipcap/web/pkg/controllers/CAuthorization"
	"clipcap/web/pkg/controllers/CPassword"
	"clipcap/web/pkg/controllers/CUser"

	"github.com/gin-gonic/gin"
)

func LogIn(c *gin.Context) {
	var credentials types.LocalAuthenticationCredentials

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(401, responses.AuthenticationMissingCredentials())
		c.Abort()
		return
	}

	User, err := CUser.FindByEmail(credentials.Email)
	if err != nil {
		c.JSON(401, responses.AuthenticationUserDoesNotExist())
		c.Abort()
		return
	}

	if err := CPassword.Compare(credentials.Password, User.Password); err != nil {
		c.JSON(401, responses.AuthenticationWrongPassword())
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Invalid email or password.")
		return
	}

	Authorization, err := CAuthorization.Create(User.ID)
	if err != nil {
		c.JSON(500, responses.AuthenticationFailedToCreateAuthorization())
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to create authorization.")
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, &types.RefreshToken{
		AuthorizationId: Authorization.ID,
	})
	if err != nil {
		c.JSON(500, responses.AuthenticationGenerateRefreshTokenFailed(err.Error()))
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to issue refresh token.")
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, &types.AccessToken{
		UserID: User.ID,
	})
	if err != nil {
		c.JSON(500, responses.AuthenticationGenerateAccessTokenFailed(err.Error()))
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", `Failed to issue access token.`)
		return
	}

	/*
		c.SetCookie("refresh_token", RefreshToken, 60*60*24*7, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
		c.SetCookie("access_token", AccessToken, 60*60, "", SConfiguration.Configuration.Host, SConfiguration.Configuration.IsProduction, true)
	*/

	var result map[string]interface{}

	result["access_token"] = AccessToken
	result["refresh_token"] = RefreshToken

	c.JSON(200, responses.SystemServerSuccessWithData(result))
	c.Abort()

	CActivity.Create([]interface{}{User.ID}, User.ID, "Logged in", `New Log In from 192.168.0.1 with Safari, Mac OS.`)
}
