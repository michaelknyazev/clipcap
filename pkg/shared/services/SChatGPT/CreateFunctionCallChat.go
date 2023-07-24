package SChatGPT

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

type TChatGPTFunctionParametersProperty struct {
	Type        string   `json:"type"`
	Description string   `json:"description"`
	Enum        []string `json:"enum,omitempty"`
}

type TChatGPTFunctionParametersProperties map[string]TChatGPTFunctionParametersProperty

type TChatGPTFunctionParameters struct {
	Type       string                               `json:"type"`
	Properties TChatGPTFunctionParametersProperties `json:"properties"`
	Required   []string                             `json:"required"`
}

type TChatGPTFunction struct {
	Name        string                     `json:"name"`
	Description string                     `json:"description"`
	Parameters  TChatGPTFunctionParameters `json:"parameters"`
}

func CreateFunctionCallChat(prompt string, language string, function TChatGPTFunction) (TGPTResponse, error) {
	var Response TGPTResponse

	URL, err := url.Parse("https://api.openai.com/v1/chat/completions")
	if err != nil {
		return Response, err
	}

	NewMessage, err := json.Marshal(TChatGPTCreateChatReqBody{
		Model:     "gpt-3.5-turbo-16k",
		Functions: []TChatGPTFunction{function},
		Messages: []TChatGPTMessage{
			{
				Role:    "system",
				Content: language,
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
	})
	if err != nil {
		return Response, err
	}

	req, err := http.NewRequest("POST", URL.String(), bytes.NewBuffer(NewMessage))
	if err != nil {
		return Response, err
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AccessToken))

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return Response, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return Response, err
	}

	if err := json.Unmarshal(body, &Response); err != nil {
		fmt.Println(err)
		return Response, err
	}

	return Response, nil
}
