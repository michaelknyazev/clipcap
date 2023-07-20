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
	"clipcap/web/pkg/controllers/CTransaction"
	"clipcap/web/pkg/controllers/CUser"
	"clipcap/web/pkg/services/SGoogle"
	"encoding/json"

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

	transactionId := c.Query("state")
	if transactionId == "" {
		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	token, err := SGoogle.OAuthConfiguration.Exchange(oauth2.NoContext, code)
	if err != nil {
		if _, err := CTransaction.FailBySeed(transactionId, "Failed to exchange tokens with Google"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	GoogleUser, err := SGoogle.GetUser(token)
	if err != nil {
		if _, err := CTransaction.FailBySeed(transactionId, "Failed to get user data from Google"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(422, responses.SystemForbidden())
		c.Abort()
		return
	}

	User, err := CUser.FindByEmail(GoogleUser.Email)
	if err != nil {
		randomPassword, err := CPassword.Generate()
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate password for user"); err != nil {
				c.JSON(500, responses.SystemServerError())
				c.Abort()
				return
			}
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		hashedPassword, err := CPassword.Hash(randomPassword)
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to hash password for user"); err != nil {
				c.JSON(500, responses.SystemServerError())
				c.Abort()
				return
			}
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		User, err = CUser.Create(GoogleUser.Email, hashedPassword, GoogleUser.Name, true)
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to create user based on google data"); err != nil {
				c.JSON(500, responses.SystemServerError())
				c.Abort()
				return
			}
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
	}

	GoogleIntegration, err := CIntegration.FindByUserIdAndType(User.ID, "google_oauth")
	if err != nil {
		if GoogleIntegration, err = CIntegration.Create("google_oauth", token.RefreshToken, token.AccessToken, token.Expiry.Unix(), User.ID); err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to create Google integration for user"); err != nil {
				c.JSON(500, responses.SystemServerError())
				c.Abort()
				return
			}

			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
	} else {
		GoogleIntegration.RefreshToken = token.RefreshToken
		GoogleIntegration.AccessToken = token.AccessToken
		GoogleIntegration.Expiry = token.Expiry.Unix()

		if _, err := CIntegration.UpdateIntegrationById(GoogleIntegration.ID, GoogleIntegration); err != nil {

			if _, err := CTransaction.FailBySeed(transactionId, "Failed to update Google integration for user"); err != nil {
				c.JSON(500, responses.SystemServerError())
				c.Abort()
				return
			}

			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}
	}

	Authorization, err := CAuthorization.Create(User.ID)
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to create authorization for user"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(500, responses.AuthenticationFailedToCreateAuthorization())
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to create authorization.")
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, &types.RefreshToken{AuthorizationId: Authorization.ID})
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate refresh_token for user"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(500, responses.AuthenticationGenerateRefreshTokenFailed(err.Error()))
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to issue refresh token.")
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, &types.AccessToken{UserID: User.ID})
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate access_token for user"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(500, responses.AuthenticationGenerateAccessTokenFailed(err.Error()))
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", `Failed to issue access token.`)
		return
	}

	TokensData := struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
	}{AccessToken, RefreshToken}

	result, err := json.Marshal(TokensData)
	if err != nil {
		if _, err := CTransaction.FailBySeed(transactionId, "Failed to tokens data to store in transaction"); err != nil {
			c.JSON(500, responses.SystemServerError())
			c.Abort()
			return
		}

		c.JSON(500, responses.AuthenticationGenerateAccessTokenFailed(err.Error()))
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", `Failed to generate tokens data in transaction.`)
		return
	}

	if _, err := CTransaction.CompleteBySeed(transactionId, string(result)); err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", `Failed to match transactionId in db.`)
		return
	}

	CActivity.Create([]interface{}{User.ID}, User.ID, "Logged in with Google", `New Log In`)

	/*
		c.SetCookie("refresh_token", RefreshToken, 60*60*24*7, "", "*", SConfiguration.Configuration.IsProduction, true)
		c.SetCookie("access_token", AccessToken, 60*60, "", "*", SConfiguration.Configuration.IsProduction, true)
	*/

	c.Header("Content-Type", "text/html")
	c.String(200, `<html><head><script type="text/javascript">window.onload = window.close()</script></head><body>Success! You may close the window</body></html>`)
	return
}
