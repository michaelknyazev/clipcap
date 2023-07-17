package SChatGPT

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

type TChatGPTCompletionReqBody struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
}

func CreateCompletion(header string, message string) (TGPTResponse, error) {
	var Response TGPTResponse

	URL, err := url.Parse("https://api.openai.com/v1/completions")
	if err != nil {
		return Response, err
	}

	NewMessage, err := json.Marshal(TChatGPTCompletionReqBody{
		Model:  "gpt-3.5-turbo-16k",
		Prompt: fmt.Sprintf("%s\n%s", header, message),
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
		return Response, err
	}

	if err := json.Unmarshal(body, &Response); err != nil {
		return Response, err
	}

	return Response, nil
}
