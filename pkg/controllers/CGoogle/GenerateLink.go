package CGoogle

import (
	"clipcap/web/pkg/services/SGoogleOAuth"
	"net/url"
	"strings"
)

func GenerateLink() (string, error) {
	oauthStateString := ""

	URL, err := url.Parse(SGoogleOAuth.Configuration.Endpoint.AuthURL)
	if err != nil {
		return "", err
	}

	parameters := url.Values{}
	parameters.Add("client_id", SGoogleOAuth.Configuration.ClientID)
	parameters.Add("scope", strings.Join(SGoogleOAuth.Configuration.Scopes, " "))
	parameters.Add("redirect_uri", SGoogleOAuth.Configuration.RedirectURL)
	parameters.Add("response_type", "code")
	parameters.Add("access_type", "offline")
	parameters.Add("state", oauthStateString)

	URL.RawQuery = parameters.Encode()

	return URL.String(), nil
}
