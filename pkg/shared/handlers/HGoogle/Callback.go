package HGoogle

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CAuthorization"
	"clipcap/pkg/shared/controllers/CIntegration"
	"clipcap/pkg/shared/controllers/CPassword"
	"clipcap/pkg/shared/controllers/CRefreshToken"
	"clipcap/pkg/shared/controllers/CTransaction"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/services/SGoogle"
	"clipcap/pkg/shared/types"
	"encoding/json"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func Callback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(422, types.TResponse{false, "QUERY_MISSING_DATA", nil})
		c.Abort()
		return
	}

	transactionId := c.Query("state")
	if transactionId == "" {
		c.JSON(422, types.TResponse{false, "QUERY_MISSING_DATA", nil})
		c.Abort()
		return
	}

	token, err := SGoogle.OAuthConfiguration.Exchange(oauth2.NoContext, code)
	if err != nil {
		if _, err := CTransaction.FailBySeed(transactionId, "Failed to exchange tokens with Google"); err != nil {
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(422, types.TResponse{false, "GOOGLE_EXCHANGE_FAILED", nil})
		c.Abort()
		return
	}

	GoogleUser, err := SGoogle.GetUser(token)
	if err != nil {
		if _, err := CTransaction.FailBySeed(transactionId, "Failed to get user data from Google"); err != nil {
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(422, types.TResponse{false, "GOOGLE_USER_FAILED", nil})
		c.Abort()
		return
	}

	User, err := CUser.FindByEmail(GoogleUser.Email)
	if err != nil {
		randomPassword, err := CPassword.Generate()
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate password for user"); err != nil {
				c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
				c.Abort()
				return
			}
			c.JSON(500, types.TResponse{false, "USER_FIND_FAILED", nil})
			c.Abort()
			return
		}

		hashedPassword, err := CPassword.Hash(randomPassword)
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to hash password for user"); err != nil {
				c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
				c.Abort()
				return
			}
			c.JSON(500, types.TResponse{false, "PASSWORD_HASH_FAILED", nil})
			c.Abort()
			return
		}

		User, err = CUser.Create(GoogleUser.Email, hashedPassword, GoogleUser.Name, true)
		if err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to create user based on google data"); err != nil {
				c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
				c.Abort()
				return
			}
			c.JSON(500, types.TResponse{false, "USER_CREATE_FAILED", nil})
			c.Abort()
			return
		}
	}

	GoogleIntegration, err := CIntegration.FindByUserIdAndType(User.ID, "google_oauth")
	if err != nil {
		if GoogleIntegration, err = CIntegration.Create("google_oauth", token.RefreshToken, token.AccessToken, token.Expiry.Unix(), User.ID); err != nil {
			if _, err := CTransaction.FailBySeed(transactionId, "Failed to create Google integration for user"); err != nil {
				c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
				c.Abort()
				return
			}

			c.JSON(500, types.TResponse{false, "INTEGRATION_CREATE_FAILED", nil})
			c.Abort()
			return
		}
	} else {
		GoogleIntegration.RefreshToken = token.RefreshToken
		GoogleIntegration.AccessToken = token.AccessToken
		GoogleIntegration.Expiry = token.Expiry.Unix()

		if _, err := CIntegration.UpdateIntegrationById(GoogleIntegration.ID, GoogleIntegration); err != nil {

			if _, err := CTransaction.FailBySeed(transactionId, "Failed to update Google integration for user"); err != nil {
				c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
				c.Abort()
				return
			}

			c.JSON(500, types.TResponse{false, "INTEGRATION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}
	}

	Authorization, err := CAuthorization.Create(User.ID)
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to create authorization for user"); err != nil {
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(500, types.TResponse{false, "AUTHENTICATION_CREATE_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to create authorization.")
		return
	}

	RefreshToken, err := CRefreshToken.Generate(User.Email, types.TRefreshToken{Authorization.ID})
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate refresh_token for user"); err != nil {
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", "Failed to issue refresh token.")
		return
	}

	AccessToken, err := CAccessToken.Generate(User.Email, types.TAccessToken{User.ID})
	if err != nil {

		if _, err := CTransaction.FailBySeed(transactionId, "Failed to generate access_token for user"); err != nil {
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(500, types.TResponse{false, "TOKEN_GENERATE_FAILED", nil})
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
			c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
			c.Abort()
			return
		}

		c.JSON(500, types.TResponse{false, "TOKEN_MARSHAL_FAILED", nil})
		c.Abort()

		CActivity.Create([]interface{}{User.ID}, User.ID, "is failed to Log In", `Failed to generate tokens data in transaction.`)
		return
	}

	if _, err := CTransaction.CompleteBySeed(transactionId, string(result)); err != nil {
		c.JSON(500, types.TResponse{false, "TRANSACTION_UPDATE_FAILED", nil})
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
