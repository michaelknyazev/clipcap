// LogIn handles the POST request to login and generate an access token and a refresh token.
// It takes the user's email and password from the request body and validates them.
// If the credentials are valid, it creates an authorization and generates a refresh token and an access token.
// It then sets the refresh token and access token cookies in the response and returns a success response.
// If there is an error, it returns an appropriate error response and aborts the request.
// If the credentials are invalid, it creates a failed login activity and returns an appropriate error response.
package HAuthentication

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CAuthorization"
	"clipcap/pkg/shared/controllers/CPassword"
	"clipcap/pkg/shared/controllers/CRefreshToken"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func LogIn(c *gin.Context) {
	//Logger := SLog.Init(uuid.New().String())
	var credentials types.TCredentials

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(401, types.TResponse{false, "BODY_EMPTY", nil})
		c.Abort()
		return
	}

	User, err := CUser.FindByEmail(credentials.Email)
	if err != nil {
		c.JSON(401, types.TResponse{false, "USER_FIND_FAILED", nil})
		c.Abort()
		return
	}

	if err := CPassword.Compare(credentials.Password, User.Password); err != nil {
		c.JSON(401, types.TResponse{false, "PASSWORD_COMPARE_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Invalid email or password.")
		return
	}

	Authorization, err := CAuthorization.Create(User.ID)
	if err != nil {
		c.JSON(500, types.TResponse{false, "AUTHORIZATION_CREATE_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to create authorization.")
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, types.TRefreshToken{Authorization.ID})
	if err != nil {
		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to issue refresh token.")
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, types.TAccessToken{User.ID})
	if err != nil {
		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
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

	c.JSON(200, types.TResponse{true, "SUCCESS", result})
	c.Abort()

	CActivity.Create([]interface{}{User.ID}, User.ID, "Logged in", `New Log In from 192.168.0.1 with Safari, Mac OS.`)
}
