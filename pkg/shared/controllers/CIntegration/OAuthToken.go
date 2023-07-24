package CIntegration

import (
	"clipcap/pkg/shared/models/MIntegration"
	"time"

	"golang.org/x/oauth2"
)

func OAuthToken(Integration MIntegration.Integration) (*oauth2.Token, error) {
	token := new(oauth2.Token)

	token.AccessToken = Integration.AccessToken
	token.RefreshToken = Integration.RefreshToken
	token.TokenType = "Bearer"
	token.Expiry = time.Unix(Integration.Expiry, 0)

	return token, nil
}
