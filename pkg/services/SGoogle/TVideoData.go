package SGoogle

/*
	GPT generated structs

	To get JSON from which it was generated try to make
	POST https://youtubei.googleapis.com/youtubei/v1/player
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

type TVideoData struct {
	ResponseContext   ResponseContext   `json:"responseContext"`
	PlayabilityStatus PlayabilityStatus `json:"playabilityStatus"`
	StreamingData     StreamingData     `json:"streamingData"`
	PlaybackTracking  PlaybackTracking  `json:"playbackTracking"`
	Captions          Captions          `json:"captions"`
	VideoDetails      VideoDetails      `json:"videoDetails"`
	PlayerConfig      PlayerConfig      `json:"playerConfig"`
	Storyboards       Storyboards       `json:"storyboards"`
	Microformat       Microformat       `json:"microformat"`
}

type ResponseContext struct {
	VisitorData                     string                          `json:"visitorData"`
	ServiceTrackingParams           []ServiceTrackingParams         `json:"serviceTrackingParams"`
	MainAppWebResponseContext       MainAppWebResponseContext       `json:"mainAppWebResponseContext"`
	WebResponseContextExtensionData WebResponseContextExtensionData `json:"webResponseContextExtensionData"`
}

type StreamingData struct {
	ExpiresInSeconds string     `json:"expiresInSeconds"`
	Formats          []Formats  `json:"formats"`
	AdaptiveFormats  []Adaptive `json:"adaptiveFormats"`
}

type Formats struct {
	Itag             int    `json:"itag"`
	Url              string `json:"url"`
	MimeType         string `json:"mimeType"`
	Bitrate          int    `json:"bitrate"`
	Width            int    `json:"width"`
	Height           int    `json:"height"`
	LastModified     string `json:"lastModified"`
	ContentLength    string `json:"contentLength"`
	Quality          string `json:"quality"`
	Fps              int    `json:"fps"`
	QualityLabel     string `json:"qualityLabel"`
	ProjectionType   string `json:"projectionType"`
	AverageBitrate   int    `json:"averageBitrate"`
	AudioQuality     string `json:"audioQuality"`
	ApproxDurationMs string `json:"approxDurationMs"`
	AudioSampleRate  string `json:"audioSampleRate"`
	AudioChannels    int    `json:"audioChannels"`
}

type Adaptive struct {
	Itag             int        `json:"itag"`
	Url              string     `json:"url"`
	MimeType         string     `json:"mimeType"`
	Bitrate          int        `json:"bitrate"`
	Width            int        `json:"width"`
	Height           int        `json:"height"`
	InitRange        InitRange  `json:"initRange"`
	IndexRange       IndexRange `json:"indexRange"`
	LastModified     string     `json:"lastModified"`
	ContentLength    string     `json:"contentLength"`
	Quality          string     `json:"quality"`
	Fps              int        `json:"fps"`
	QualityLabel     string     `json:"qualityLabel"`
	ProjectionType   string     `json:"projectionType"`
	AverageBitrate   int        `json:"averageBitrate"`
	ApproxDurationMs string     `json:"approxDurationMs"`
}

type InitRange struct {
	Start string `json:"start"`
	End   string `json:"end"`
}

type IndexRange struct {
	Start string `json:"start"`
	End   string `json:"end"`
}

type PlaybackTracking struct {
	VideostatsPlaybackUrl                   BaseUrl `json:"videostatsPlaybackUrl"`
	VideostatsDelayplayUrl                  BaseUrl `json:"videostatsDelayplayUrl"`
	VideostatsWatchtimeUrl                  BaseUrl `json:"videostatsWatchtimeUrl"`
	PtrackingUrl                            BaseUrl `json:"ptrackingUrl"`
	QoeUrl                                  BaseUrl `json:"qoeUrl"`
	AtrUrl                                  BaseUrl `json:"atrUrl"`
	VideostatsScheduledFlushWalltimeSeconds []int   `json:"videostatsScheduledFlushWalltimeSeconds"`
	VideostatsDefaultFlushIntervalSeconds   int     `json:"videostatsDefaultFlushIntervalSeconds"`
	YoutubeRemarketingUrl                   BaseUrl `json:"youtubeRemarketingUrl"`
}

type BaseUrl struct {
	BaseUrl                 string `json:"baseUrl"`
	ElapsedMediaTimeSeconds int    `json:"elapsedMediaTimeSeconds,omitempty"`
}
type Attitude struct {
	BaseUrl                 string `json:"baseUrl"`
	ElapsedMediaTimeSeconds int    `json:"elapsedMediaTimeSeconds,omitempty"`
}

type Message struct {
	MealbarPromoRenderer Renderer `json:"mealbarPromoRenderer"`
}

type Renderer struct {
	MessageTexts        []Runs        `json:"messageTexts"`
	ActionButton        Button        `json:"actionButton"`
	DismissButton       Button        `json:"dismissButton"`
	TriggerCondition    string        `json:"triggerCondition"`
	Style               string        `json:"style"`
	TrackingParams      string        `json:"trackingParams"`
	ImpressionEndpoints []UrlEndpoint `json:"impressionEndpoints"`
	ActionEndpoints     []UrlEndpoint `json:"actionEndpoints"`
	IsVisible           bool          `json:"isVisible"`
}

type Runs struct {
	Text string `json:"text"`
}

type Button struct {
	ButtonRenderer RendererDetails `json:"buttonRenderer"`
}

type RendererDetails struct {
	Style              string      `json:"style"`
	Size               string      `json:"size"`
	IsDisabled         bool        `json:"isDisabled"`
	Text               Runs        `json:"text"`
	NavigationEndpoint UrlEndpoint `json:"navigationEndpoint"`
	TrackingParams     string      `json:"trackingParams"`
}

type UrlEndpoint struct {
	Url      string `json:"url"`
	NoFollow bool   `json:"nofollow"`
}

type WebPlayerConfig struct {
	WebPlayerActionsPorting WebPlayerActionsPorting `json:"webPlayerActionsPorting"`
}

type WebPlayerActionsPorting struct {
	GetSharePanelCommand GetSharePanelCommand `json:"getSharePanelCommand"`
}

type GetSharePanelCommand struct {
	ClickTrackingParams string             `json:"clickTrackingParams"`
	CommandMetadata     CommandMetadata    `json:"commandMetadata"`
	WebCommandMetadata  WebCommandMetadata `json:"webCommandMetadata"`
}

type CommandMetadata struct {
	WebCommandMetadata WebCommandMetadata `json:"webCommandMetadata"`
}

type WebCommandMetadata struct {
	Url         string `json:"url"`
	WebPageType string `json:"webPageType"`
	RootVe      int    `json:"rootVe"`
}

type VideoDetails struct {
	VideoId           string     `json:"videoId"`
	Title             string     `json:"title"`
	LengthSeconds     string     `json:"lengthSeconds"`
	Keywords          []string   `json:"keywords"`
	ChannelId         string     `json:"channelId"`
	IsOwnerViewing    bool       `json:"isOwnerViewing"`
	ShortDescription  string     `json:"shortDescription"`
	IsCrawlable       bool       `json:"isCrawlable"`
	Thumbnail         Thumbnails `json:"thumbnail"`
	AverageRating     float64    `json:"averageRating"`
	AllowRatings      bool       `json:"allowRatings"`
	ViewCount         string     `json:"viewCount"`
	Author            string     `json:"author"`
	IsPrivate         bool       `json:"isPrivate"`
	IsUnpluggedCorpus bool       `json:"isUnpluggedCorpus"`
	IsLiveContent     bool       `json:"isLiveContent"`
}

type Thumbnails struct {
	Thumbnails []Thumbnail `json:"thumbnails"`
}

type Thumbnail struct {
	Url    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

type PlayerConfig struct {
	AudioConfig           AudioConfig `json:"audioConfig"`
	StreamSelectionConfig struct{}    `json:"streamSelectionConfig"`
	MediaCommonConfig     struct{}    `json:"mediaCommonConfig"`
}

type AudioConfig struct {
	LoudnessDb              float64 `json:"loudnessDb"`
	PerceptualLoudnessDb    float64 `json:"perceptualLoudnessDb"`
	EnablePerFormatLoudness bool    `json:"enablePerFormatLoudness"`
}

type ServiceTrackingParams struct {
	Service string  `json:"service"`
	Params  []Param `json:"params"`
}

type Param struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type MainAppWebResponseContext struct {
	LoggedOut     bool   `json:"loggedOut"`
	TrackingParam string `json:"trackingParam"`
}

type WebResponseContextExtensionData struct {
	HasDecorated bool `json:"hasDecorated"`
}

type PlayabilityStatus struct {
	Status          string     `json:"status"`
	PlayableInEmbed bool       `json:"playableInEmbed"`
	Miniplayer      Miniplayer `json:"miniplayer"`
}

type Miniplayer struct {
	MiniplayerRenderer struct{} `json:"miniplayerRenderer"`
}

type Captions struct {
	PlayerCaptionsRenderer          PlayerCaptionsRenderer          `json:"playerCaptionsRenderer"`
	PlayerCaptionsTracklistRenderer PlayerCaptionsTracklistRenderer `json:"playerCaptionsTracklistRenderer"`
}

type PlayerCaptionsRenderer struct {
	BaseUrl    string `json:"baseUrl"`
	Visibility string `json:"visibility"`
}

type PlayerCaptionsTracklistRenderer struct {
	CaptionTracks          []CaptionTrack        `json:"captionTracks"`
	AudioTracks            []AudioTrack          `json:"audioTracks"`
	TranslationLanguages   []TranslationLanguage `json:"translationLanguages"`
	DefaultAudioTrackIndex int                   `json:"defaultAudioTrackIndex"`
}

type CaptionTrack struct {
	BaseUrl        string `json:"baseUrl"`
	Name           Name   `json:"name"`
	VssId          string `json:"vssId"`
	LanguageCode   string `json:"languageCode"`
	Kind           string `json:"kind"`
	IsTranslatable bool   `json:"isTranslatable"`
}

type Name struct {
	SimpleText string `json:"simpleText"`
}

type AudioTrack struct {
	CaptionTrackIndex int  `json:"captionTrackIndex"`
	IsDefault         bool `json:"isDefault"`
}

type TranslationLanguage struct {
	LanguageCode string `json:"languageCode"`
	LanguageName Name   `json:"languageName"`
}

type Storyboards struct {
	PlayerStoryboardSpecRenderer PlayerStoryboardSpecRenderer `json:"playerStoryboardSpecRenderer"`
}

type PlayerStoryboardSpecRenderer struct {
	Spec string `json:"spec"`
}

type Microformat struct {
	PlayerMicroformatRenderer PlayerMicroformatRenderer `json:"playerMicroformatRenderer"`
}

type PlayerThumbnail struct {
	URL    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

type PlayerThumbnails struct {
	Thumbnails []PlayerThumbnail `json:"thumbnails"`
}

type PlayerEmbed struct {
	IframeUrl string `json:"iframeUrl"`
	Width     int    `json:"width"`
	Height    int    `json:"height"`
}

type PlayerTitle struct {
	SimpleText string `json:"simpleText"`
}

type PlayerDescription struct {
	SimpleText string `json:"simpleText"`
}

type PlayerMicroformatRenderer struct {
	Thumbnail          PlayerThumbnails  `json:"thumbnail"`
	Embed              PlayerEmbed       `json:"embed"`
	Title              PlayerTitle       `json:"title"`
	Description        PlayerDescription `json:"description"`
	LengthSeconds      string            `json:"lengthSeconds"`
	OwnerProfileUrl    string            `json:"ownerProfileUrl"`
	ExternalChannelId  string            `json:"externalChannelId"`
	IsFamilySafe       bool              `json:"isFamilySafe"`
	AvailableCountries []string          `json:"availableCountries"`
	IsUnlisted         bool              `json:"isUnlisted"`
	HasYpcMetadata     bool              `json:"hasYpcMetadata"`
	ViewCount          string            `json:"viewCount"`
	Category           string            `json:"category"`
	PublishDate        string            `json:"publishDate"`
	OwnerChannelName   string            `json:"ownerChannelName"`
	UploadDate         string            `json:"uploadDate"`
}
