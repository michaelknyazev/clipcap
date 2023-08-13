package SGoogle

import (
	"errors"

	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var OAuthConfiguration = &oauth2.Config{
	ClientID:     "",
	ClientSecret: "",
	RedirectURL:  "",
	Scopes:       []string{},
	Endpoint:     google.Endpoint,
}

func Init() error {
	googleClientId := viper.GetString("integrations.google.client_id")
	googleClientSecret := viper.GetString("integrations.google.client_secret")
	googleRedirectUri := viper.GetString("integrations.google.redirect_uri")

	if googleClientId == "" || googleClientSecret == "" || googleRedirectUri == "" {
		return errors.New("empty configuration")
	}

	OAuthConfiguration.ClientID = googleClientId
	OAuthConfiguration.ClientSecret = googleClientSecret
	OAuthConfiguration.RedirectURL = googleRedirectUri
	OAuthConfiguration.Scopes = []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
	}

	return nil
}
