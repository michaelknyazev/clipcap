package SGoogle

import (
	"clipcap/web/pkg/services/SGoogleOAuth"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"

	"golang.org/x/oauth2"
)

func GetUser(token *oauth2.Token) (TGoogleUser, error) {
	var User TGoogleUser

	URL, err := url.Parse("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return User, err
	}

	req, err := http.NewRequest("GET", URL.String(), nil)
	if err != nil {
		return User, err
	}

	client := SGoogleOAuth.Configuration.Client(oauth2.NoContext, token)
	res, err := client.Do(req)
	if err != nil {
		return User, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return User, err
	}

	if err := json.Unmarshal(body, &User); err != nil {
		return User, err
	}

	return User, nil
}
