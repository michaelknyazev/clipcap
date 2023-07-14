package Google

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/controllers/CRefreshToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CActivity"
	"clipcap/web/pkg/controllers/CAuthorization"
	"clipcap/web/pkg/controllers/CIntegration"
	"clipcap/web/pkg/controllers/CPassword"
	"clipcap/web/pkg/controllers/CUser"
	"clipcap/web/pkg/services/SGoogle"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func Callback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	token, err := SGoogle.OAuthConfiguration.Exchange(oauth2.NoContext, code)
	if err != nil {
		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	GoogleUser, err := SGoogle.GetUser(token)
	if err != nil {
		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	User, err := CUser.FindByEmail(GoogleUser.Email)
	if err != nil {
		randomPassword, err := CPassword.Generate()
		if err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		hashedPassword, err := CPassword.Hash(randomPassword)
		if err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		User, err = CUser.Create(GoogleUser.Email, hashedPassword, GoogleUser.Name, true)
		if err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
	}

	CurrentIntegration, err := CIntegration.FindByUserIdAndType(User.ID, "google_oauth")
	if err != nil {
		if _, err := CIntegration.Create("google_oauth", token.RefreshToken, token.AccessToken, token.Expiry.Unix(), User.ID); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.Redirect(302, "/")
		return
	} else {
		CurrentIntegration.RefreshToken = token.RefreshToken
		CurrentIntegration.AccessToken = token.AccessToken
		CurrentIntegration.Expiry = token.Expiry.Unix()

		if _, err := CIntegration.UpdateIntegrationById(CurrentIntegration.ID, CurrentIntegration); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
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

	c.SetCookie("refresh_token", RefreshToken, 60*60*24*7, "", "", false, true)
	c.SetCookie("access_token", AccessToken, 60*60, "", "", false, true)

	CActivity.Create([]interface{}{User.ID}, User.ID, "Logged in", `New Log In from 192.168.0.1 with Safari, Mac OS.`)

	c.Redirect(302, "/")
	return
}
