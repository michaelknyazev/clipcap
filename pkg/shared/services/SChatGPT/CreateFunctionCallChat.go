package SChatGPT

import (
	"bytes"
	"clipcap/pkg/shared/services/SLog"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func CreateFunctionCallChat(logger SLog.TLogger, model string, systemPrompts []string, prompts []string, function TChatGPTFunction) (TGPTResponse, error) {
	var Response TGPTResponse

	URL, err := url.Parse("https://api.openai.com/v1/chat/completions")
	if err != nil {
		return Response, err
	}

	var messages []TChatGPTMessage

	for _, msg := range systemPrompts {
		messages = append(messages, TChatGPTMessage{
			Role:    "system",
			Content: msg,
		})
	}

	for _, msg := range prompts {
		messages = append(messages, TChatGPTMessage{
			Role:    "user",
			Content: msg,
		})
	}

	NewMessage, err := json.Marshal(TChatGPTCreateChat{
		Model:     model,
		Functions: []TChatGPTFunction{function},
		Messages:  messages,
	})
	if err != nil {
		return Response, err
	}

	logger.Log("POST %s\n Body:\n```json\n%s\n```", URL.String(), string(NewMessage))

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

	logger.Log("POST %s\n Response:\n```json\n%s\n```", URL.String(), string(body))

	if err := json.Unmarshal(body, &Response); err != nil {
		fmt.Println(err)
		return Response, err
	}

	return Response, nil
}
