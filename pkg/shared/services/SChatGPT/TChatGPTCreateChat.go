package SChatGPT

type TChatGPTCreateChat struct {
	Model       string             `json:"model"`
	Temperature int64              `json:"temperature"`
	Messages    []TChatGPTMessage  `json:"messages"`
	Functions   []TChatGPTFunction `json:"functions,omitempty"`
}
