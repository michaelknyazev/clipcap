package SChatGPT

type TGPTResponse struct {
	ID      string    `json:"id"`
	Object  string    `json:"object"`
	Created int64     `json:"created"`
	Choices []Choices `json:"choices"`
	Usage   Usage     `json:"usage"`
}

type TChatGPTResponseFunctionCall struct {
	Name      string `json:"name"`
	Content   string `json:"content"`
	Arguments string `json:"arguments"`
}

type Choices struct {
	Index        int     `json:"index"`
	Message      Message `json:"message"`
	FinishReason string  `json:"finish_reason"`
}

type Message struct {
	Role         string                       `json:"role"`
	Content      string                       `json:"content"`
	FunctionCall TChatGPTResponseFunctionCall `json:"function_call"`
	FinishReason string                       `json:"finish_reason"`
}

type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}
