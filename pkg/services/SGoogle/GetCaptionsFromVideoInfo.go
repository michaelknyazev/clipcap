package SGoogle

import (
	"clipcap/web/pkg/services/SGoogleOAuth"
	"encoding/xml"
	"io/ioutil"
	"net/http"
	"net/url"

	"golang.org/x/oauth2"
)

type TCaptionTranscript struct {
	TextEntries []TCaptionTranscriptTextEntry `xml:"text"`
}

type TCaptionTranscriptTextEntry struct {
	Start    float64 `xml:"start,attr"`
	Duration float64 `xml:"dur,attr"`
	Content  string  `xml:",chardata"`
}

func GetCaptionsFromVideoInfo(token *oauth2.Token, VideoData TVideoData) (TCaptionTranscript, error) {
	var captionsUrl string
	var Transcript TCaptionTranscript

	for _, captionTrack := range VideoData.Captions.PlayerCaptionsTracklistRenderer.CaptionTracks {
		if captionTrack.LanguageCode == "en" {
			captionsUrl = captionTrack.BaseUrl
			break
		}
	}

	URL, err := url.Parse(captionsUrl)
	if err != nil {
		return Transcript, err
	}

	req, err := http.NewRequest("GET", URL.String(), nil)
	if err != nil {
		return Transcript, err
	}

	client := SGoogleOAuth.Configuration.Client(oauth2.NoContext, token)
	res, err := client.Do(req)
	if err != nil {
		return Transcript, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return Transcript, err
	}

	if err := xml.Unmarshal(body, &Transcript); err != nil {
		return Transcript, err
	}

	return Transcript, nil
}
