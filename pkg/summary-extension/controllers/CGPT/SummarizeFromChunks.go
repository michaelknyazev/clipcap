package CGPT

import (
	"clipcap/pkg/shared/services/SChatGPT"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
)

type TSummary struct {
	Emoji   string
	Error   bool
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

const language = "Russian"

func SummarizeFromChunks(chunks []TChunk) ([]TSummary, error) {
	var wg sync.WaitGroup
	var errs []TSummaryError

	result := make([]TSummary, len(chunks))

	var langPrompt string
	var titlePrompt string
	var insightPrompt string
	var funcDescription string
	var emojiPrompt string

	switch language {
	case "Russian":
		funcDescription = "Функция - суммаризатор ключевой точки зрения на русском языке из предоставленного текста."
		langPrompt = `Представь что ты работаешь создателем текста для интернет-сайтов на русском языке.
Ты можешь отвечать только на русском языке, при этом ты можешь понимать любой другой язык, который тебе дали для работы. 
Результат твоей работы на русском языке должен соответствовать правилам в каждом данном тебе задании.
Результат твоей работы на русском языке всегда будет проверяться в соответствии с данными тебе правилами в каждом задании.
Если результат работы предоставлен не на русском языке, то работа будет считаться не выполненной.
Результат твоей работы должен быть предоставлен на русском языке.
Будь креативным! 
Пожалуйста, ответь на русском языке, без общения.`
		titlePrompt = `Короткий заголовок для предоставленного текста на русском языке.
Создай короткий заголовок на русском языке для предоставленного текста, который состоит из не более чем пяти слов, следуя этим правилам:
1. Заголовок на русском языке должен суммировать предоставленный текст.
2. Заголовок на русском языке должен отражать смысл предоставленного текста.
3. Заголовок на русском языке должен содержать не более чем пять слов.
4. Заголовок должен быть написан на русском языке

Короткий заголовок на русском языке для предоставленного текста не длинее пяти слов на русском языке:`
		emojiPrompt = "Смайлик, описывающий предоставленный текст. например. 💡. Смайлик для предоставленного текста:"
		insightPrompt = `Краткое содержание заданного текста на русском языке.
Создай краткое резюме для предоставленного текста на русском языке, состоящее не более чем из десяти слов, следуя этим правилам:
1. Не меняй смысл предоставленного текста.
2. Если текст предоставлен не на русском языке, переведи его на русский язык и создай краткое резюме на русском языке.
3. Краткое резюме на русском языке должно быть не более чем десять слов. 
4. Текст должен быть написан на русском языке.
		
Сгенерировано краткое резюме на русском языке из текста не длинее десяти слов на русском языке:`
		break
	}

	props := SChatGPT.TChatGPTFunctionParametersProperties{}

	props["emoji"] = SChatGPT.TChatGPTFunctionParametersProperty{
		Type:        "string",
		Description: emojiPrompt,
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
			var _summary TSummary

			_done := false
			var maxAttempts int64 = 2
			var retryInSeconds int64 = 3
			var currentAttemptNumber int64
			var summaryGenerated bool = false

			for !_done {
				summary, err := getSummary(item, langPrompt, function)
				if err != nil {
					fmt.Printf("#Chunk %d: Error while getting an openapi response, continue in %d seconds...\n", i, retryInSeconds)

					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						fmt.Printf("#Chunk %d: Error summarizing chunk after %d attempts. \n\nLangPrompt: %s\nContent: %s\n", i, currentAttemptNumber, langPrompt, strings.Join(item.Content, "\n"))
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
					}
				} else {
					fmt.Printf("#Chunk %d: Chunk summarized!\n", i)

					_done = true
					_summary = summary
					summaryGenerated = true
				}
			}

			_summary.Error = !summaryGenerated

			result[i] = _summary
		}(i, chunk)
	}

	wg.Wait()

	if len(errs) != 0 {
		return result, errors.New("errors while summarizing some chunks")
	}

	return result, nil
}

func getSummary(chunk TChunk, langPrompt string, function SChatGPT.TChatGPTFunction) (TSummary, error) {
	var errs []TSummaryError

	content := strings.Join(chunk.Content, "\n")

	chat, err := SChatGPT.CreateFunctionCallChat(content, langPrompt, function)
	if err != nil || len(chat.Choices) == 0 {
		//fmt.Println(err)

		// d, _ := json.Marshal(chat)
		// fmt.Println(string(d))
		errs = append(errs, TSummaryError{
			Chunk:   chunk,
			Message: "Can't create chat with function call",
		})
		return TSummary{}, err
	}

	if len(chat.Choices[0].Message.FunctionCall.Arguments) == 0 {
		// d, _ := json.Marshal(chat)
		// fmt.Println(string(d))
		errs = append(errs, TSummaryError{
			Chunk:   chunk,
			Message: "Can't parse response from function call",
		})
		return TSummary{}, errors.New("no function response from gpt")
	}

	var fcResult TInsightsResponse

	if err := json.Unmarshal([]byte(chat.Choices[0].Message.FunctionCall.Arguments), &fcResult); err != nil {
		//fmt.Println("Can't parse the response from chatgpt")

		//d, _ := json.Marshal(chat)
		//fmt.Println(string(d))

		errs = append(errs, TSummaryError{
			Chunk:   chunk,
			Message: "Can't parse response from function call",
		})
		return TSummary{}, err
	}

	result := TSummary{
		Start:   chunk.Start,
		Error:   false,
		End:     chunk.End,
		Title:   fcResult.Title,
		Emoji:   fcResult.Emoji,
		Content: fcResult.Insight,
	}

	return result, nil
}
