package SGoogle

type TVideoDataWebAppInfo struct {
	GraftUrl string `json:"graftUrl"`
}

type TVideoDataClient struct {
	HL             string               `json:"hl"`
	ClientName     string               `json:"clientName"`
	ClientVersion  string               `json:"clientVersion"`
	MainAppWebInfo TVideoDataWebAppInfo `json:"mainAppWebInfo"`
}

type TVideoDataContext struct {
	Client TVideoDataClient `json:"client"`
}

type TVideoDataReqBody struct {
	Context TVideoDataContext `json:"context"`
	VideoID string            `json:"videoId"`
}
