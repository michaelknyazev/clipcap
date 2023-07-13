package SGoogle

import (
	"clipcap/web/pkg/services/SGoogleOAuth"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"

	"golang.org/x/oauth2"
)

type TYoutubeCaptionListItem struct {
	Kind string `json:"kind"`
	Etag string `json:"etag"`
	ID   string `json:"id,omitempty"`
}

type TYoutubeCaptionList struct {
	TYoutubeCaptionListItem
	Items []TYoutubeCaptionListItem `json:"items,omitempty"`
}

func GetCaptions(token *oauth2.Token, videoId string) ([]byte, error) {
	client := SGoogleOAuth.Configuration.Client(oauth2.NoContext, token)

	URL, err := url.Parse("https://www.googleapis.com/youtube/v3/captions?videoId=" + videoId)
	if err != nil {
		return []byte{}, err
	}

	req, err := http.NewRequest("GET", URL.String(), nil)
	if err != nil {
		return []byte{}, err
	}

	res, err := client.Do(req)
	if err != nil {
		return []byte{}, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return []byte{}, err
	}

	var CaptionsList TYoutubeCaptionList

	if err := json.Unmarshal(body, &CaptionsList); err != nil {
		return []byte{}, err
	}

	for _, cap := range CaptionsList.Items {
		URL, err := url.Parse("https://www.googleapis.com/youtube/v3/captions/" + cap.ID)
		if err != nil {
			return []byte{}, err
		}

		req, err := http.NewRequest("GET", URL.String(), nil)
		if err != nil {
			return []byte{}, err
		}

		res, err := client.Do(req)
		if err != nil {
			return []byte{}, err
		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			return []byte{}, err
		}

		return body, nil
	}

	return []byte{}, errors.New("Empty")
}
