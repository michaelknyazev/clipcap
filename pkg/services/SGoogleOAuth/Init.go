package SGoogleOAuth

import (
	"errors"

	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var Configuration = &oauth2.Config{
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

	Configuration.ClientID = googleClientId
	Configuration.ClientSecret = googleClientSecret
	Configuration.RedirectURL = googleRedirectUri
	Configuration.Scopes = []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/youtube.readonly",
		"https://www.googleapis.com/auth/youtube",
		"https://www.googleapis.com/auth/youtube.force-ssl",
		"https://www.googleapis.com/auth/youtubepartner",
	}

	return nil
}
