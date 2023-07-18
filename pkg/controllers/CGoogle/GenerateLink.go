package CGoogle

import (
	"clipcap/web/pkg/services/SGoogle"
	"net/url"
	"strings"
)

func GenerateLink(seed string) (string, error) {
	oauthStateString := seed

	URL, err := url.Parse(SGoogle.OAuthConfiguration.Endpoint.AuthURL)
	if err != nil {
		return "", err
	}

	parameters := url.Values{}
	parameters.Add("client_id", SGoogle.OAuthConfiguration.ClientID)
	parameters.Add("scope", strings.Join(SGoogle.OAuthConfiguration.Scopes, " "))
	parameters.Add("redirect_uri", SGoogle.OAuthConfiguration.RedirectURL)
	parameters.Add("response_type", "code")
	parameters.Add("access_type", "offline")
	parameters.Add("state", oauthStateString)

	URL.RawQuery = parameters.Encode()

	return URL.String(), nil
}
