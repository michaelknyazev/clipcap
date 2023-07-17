package SGoogle

import (
	"encoding/xml"
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"
)

type TCaptionTranscript struct {
	TextEntries []TCaptionTranscriptTextEntry `xml:"text"`
}

type TCaptionTranscriptTextEntry struct {
	Start    float64 `xml:"start,attr"`
	Duration float64 `xml:"dur,attr"`
	Content  string  `xml:",chardata"`
}

func GetCaptionsFromVideoInfo(VideoData TVideoData) (TCaptionTranscript, string, error) {
	var Transcript TCaptionTranscript

	if len(VideoData.Captions.PlayerCaptionsTracklistRenderer.CaptionTracks) == 0 {
		return Transcript, "", errors.New("no captions to work with")
	}

	captionTrack := VideoData.Captions.PlayerCaptionsTracklistRenderer.CaptionTracks[0]
	captionsUrl := captionTrack.BaseUrl
	language := captionTrack.LanguageCode

	URL, err := url.Parse(captionsUrl)
	if err != nil {
		return Transcript, "", err
	}

	req, err := http.NewRequest("GET", URL.String(), nil)
	if err != nil {
		return Transcript, "", err
	}

	client := http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return Transcript, "", err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return Transcript, "", err
	}

	if err := xml.Unmarshal(body, &Transcript); err != nil {
		return Transcript, "", err
	}

	return Transcript, language, nil
}
