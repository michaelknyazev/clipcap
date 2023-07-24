package CGPT

import (
	"clipcap/pkg/shared/services/SChatGPT"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
)

type TSummary struct {
	Emoji   string
	Title   string
	Content string
	Start   float64
	End     float64
}

type TSummaryError struct {
	Chunk   TChunk
	Message string
}

type TInsightsResponse struct {
	Emoji   string `json:"emoji"`
	Title   string `json:"title"`
	Insight string `json:"insight"`
}

const language = "English"

func SummarizeFromChunks(chunks []TChunk) ([]TSummary, error) {
	var wg sync.WaitGroup
	var errs []TSummaryError

	result := make([]TSummary, len(chunks))

	var langPrompt string
	var titlePrompt string
	var insightPrompt string
	var funcDescription string

	switch language {
	case "Russian":
		funcDescription = "Сформировать ключевой инсайт из предоставленного транскрипта видео"
		langPrompt = "Представь что ты пишешь для социальной сети. Будь креативным! Пожалуйста, ответь на Русском языке, без общения, только результат функции."
		titlePrompt = "Короткий заголовок для предоставленного текста. Пример: Уникальная Технология"
		insightPrompt = "Короткий ключевой инсайт из предоставленного текста."
		break
	case "English":
		funcDescription = "Get key insight from the provided video transcription."
		langPrompt = "Imagine that you are a content writer. Be creative! Please, answer in English, no conversation. just provide the result of a function call"
		titlePrompt = "The title for given text, eg. Unique Feature"
		insightPrompt = "The short key insight from given text"
		break
	}

	props := SChatGPT.TChatGPTFunctionParametersProperties{}

	props["emoji"] = SChatGPT.TChatGPTFunctionParametersProperty{
		Type:        "string",
		Description: "An emoji of your choice that describes given text. eg. 💡",
	}

	props["title"] = SChatGPT.TChatGPTFunctionParametersProperty{
		Type:        "string",
		Description: titlePrompt,
	}

	props["insight"] = SChatGPT.TChatGPTFunctionParametersProperty{
		Type:        "string",
		Description: insightPrompt,
	}

	function := SChatGPT.TChatGPTFunction{
		Name:        "get_insight",
		Description: funcDescription,
		Parameters: SChatGPT.TChatGPTFunctionParameters{
			Type:       "object",
			Properties: props,
			Required:   []string{"emoji", "title", "insight"},
		},
	}

	for i, chunk := range chunks {
		wg.Add(1)

		go func(i int, item TChunk) {
			defer wg.Done()

			chat, err := SChatGPT.CreateFunctionCallChat(strings.Join(item.Content, ""), langPrompt, function)
			if err != nil || len(chat.Choices) == 0 {
				fmt.Println(err)

				d, _ := json.Marshal(chat)
				fmt.Println(string(d))
				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't create chat with function call",
				})
				return
			}

			if len(chat.Choices[0].Message.FunctionCall.Arguments) == 0 {
				fmt.Println("no function response from gpt")

				d, _ := json.Marshal(chat)
				fmt.Println(string(d))
				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't parse response from function call",
				})
				return
			}

			var fcResult TInsightsResponse

			if err := json.Unmarshal([]byte(chat.Choices[0].Message.FunctionCall.Arguments), &fcResult); err != nil {
				fmt.Println("Can't parse the response from chatgpt")

				d, _ := json.Marshal(chat)
				fmt.Println(string(d))
				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't parse response from function call",
				})
				return
			}

			result[i] = TSummary{
				Start:   item.Start,
				End:     item.End,
				Title:   fcResult.Title,
				Emoji:   fcResult.Emoji,
				Content: fcResult.Insight,
			}
		}(i, chunk)
	}

	wg.Wait()

	if len(errs) != 0 {
		return result, errors.New("errors while summarizing some chunks")
	}

	return result, nil
}
