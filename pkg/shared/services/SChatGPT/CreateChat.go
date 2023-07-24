package SChatGPT

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"
)

type TChatGPTMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
	Name    string `json:"name,omitempty"`
}

type TChatGPTCreateChatReqBody struct {
	Model     string             `json:"model"`
	Messages  []TChatGPTMessage  `json:"messages"`
	Functions []TChatGPTFunction `json:"functions,omitempty"`
}

func CreateChat(header string, message string) (TGPTResponse, error) {
	var Response TGPTResponse

	URL, err := url.Parse("https://api.openai.com/v1/chat/completions")
	if err != nil {
		return Response, err
	}

	NewMessage, err := json.Marshal(TChatGPTCreateChatReqBody{
		Model: "gpt-3.5-turbo-16k",
		Messages: []TChatGPTMessage{
			{
				Role:    "system",
				Content: header,
			},
			{
				Role:    "user",
				Content: message,
			},
		},
	})
	if err != nil {
		return Response, err
	}

	ioutil.WriteFile(fmt.Sprintf("./__required/api-calls/create-chat-%s.json", time.Now()), NewMessage, 0644)

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
		return Response, err
	}

	if err := json.Unmarshal(body, &Response); err != nil {
		return Response, err
	}

	return Response, nil
}
