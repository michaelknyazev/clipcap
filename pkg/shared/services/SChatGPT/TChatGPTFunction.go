package SChatGPT

type TChatGPTFunction struct {
	Name        string                     `json:"name"`
	Description string                     `json:"description"`
	Parameters  TChatGPTFunctionParameters `json:"parameters"`
}

type TChatGPTFunctionParameters struct {
	Type       string                               `json:"type"`
	Properties TChatGPTFunctionParametersProperties `json:"properties"`
	Required   []string                             `json:"required"`
}

type TChatGPTFunctionParametersProperties map[string]TChatGPTFunctionParametersProperty

type TChatGPTFunctionParametersProperty struct {
	Type        string   `json:"type"`
	Description string   `json:"description"`
	Enum        []string `json:"enum,omitempty"`
}
