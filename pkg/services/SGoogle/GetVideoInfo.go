package SGoogle

import (
	"bytes"
	"clipcap/web/pkg/services/SGoogleOAuth"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"golang.org/x/oauth2"
)

/*
	{
 "context": {
   "client": {
    "hl": "en",
    "clientName": "WEB",
    "clientVersion": "2.20210721.00.00",
    "mainAppWebInfo": {
        "graftUrl": "/watch?v=dCxSsr5xuL8"
    }
   }
  },
  "videoId": "dCxSsr5xuL8"
}
*/

func GetVideoInfo(token *oauth2.Token, videoId string) (TVideoData, error) {
	var VideoData TVideoData

	URL, err := url.Parse("https://youtubei.googleapis.com/youtubei/v1/player")
	if err != nil {
		return VideoData, err
	}

	VideoDataReqBody, err := json.Marshal(TVideoDataReqBody{
		Context: TVideoDataContext{
			Client: TVideoDataClient{
				HL:            "en",
				ClientName:    "WEB",
				ClientVersion: "2.20210721.00.00",
				MainAppWebInfo: TVideoDataWebAppInfo{
					GraftUrl: "/watch?v=" + videoId,
				},
			},
		},
		VideoID: videoId,
	})
	if err != nil {
		return VideoData, err
	}

	req, err := http.NewRequest("POST", URL.String(), bytes.NewBuffer(VideoDataReqBody))
	if err != nil {
		return VideoData, err
	}

	fmt.Println(token)

	client := SGoogleOAuth.Configuration.Client(oauth2.NoContext, token)
	res, err := client.Do(req)
	if err != nil {
		return VideoData, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return VideoData, err
	}

	if err := json.Unmarshal(body, &VideoData); err != nil {
		return VideoData, err
	}

	return VideoData, nil
}