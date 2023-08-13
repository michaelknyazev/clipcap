package CSummary

import (
	"clipcap/pkg/shared/services/SChatGPT"
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/summary-extension/controllers/CGPT"
	"clipcap/pkg/summary-extension/models/MChunk"
	"clipcap/pkg/summary-extension/models/MSummary"
	"clipcap/pkg/summary-extension/prompts"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GenerateFromChunks(logger SLog.TLogger, chunks []MChunk.TChunk, GPTFunctionCall CGPT.TCreateFunctionCallChat) ([]MSummary.TSummary, error) {
	var wg sync.WaitGroup

	result := make([]MSummary.TSummary, len(chunks))

	var langPrompt string
	var titlePrompt string
	var insightPrompt string
	var funcDescription string
	var emojiPrompt string

	funcDescription = prompts.EN_SUMMARIZE_FUNCTION_DESCRIPTION
	langPrompt = prompts.EN_SUMMARIZE_PROMPT
	titlePrompt = prompts.EN_SUMMARIZE_FUNCTION_TITLE
	emojiPrompt = prompts.EN_SUMMARIZE_FUNCTION_EMOJI
	insightPrompt = prompts.EN_SUMMARIZE_FUNCTION_INSIGHT

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

		go func(i int, item MChunk.TChunk) {
			defer wg.Done()
			var _summary MSummary.TSummary

			_done := false
			var maxAttempts int64 = 2
			var retryInSeconds int64 = 3
			var currentAttemptNumber int64

			for !_done {
				var attemptModifier string
				var Insights struct {
					Emoji   string `json:"emoji"`
					Title   string `json:"title"`
					Insight string `json:"insight"`
				}

				if err := GPTFunctionCall(logger, []string{langPrompt}, []string{item.RewritedContent, attemptModifier}, function, &Insights); err != nil {
					logger.Log("#Summary %d: Error while getting an openapi response, continue in %d seconds. Error: %s", i, retryInSeconds, err.Error())

					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						logger.Log("#Summary %d: Error summarizing chunk after %d attempts. \n\nLangPrompt: %s\nContent: %s", i, currentAttemptNumber, langPrompt, item.OriginalContent)
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
						attemptModifier += "_"
					}
				} else {
					logger.Log("#Summary %d: Chunk summarized!", i)

					_done = true
					ts := time.Now()
					_summary = MSummary.TSummary{
						ID:       primitive.NewObjectID(),
						SourceID: item.SourceID,
						Start:    item.Start,
						End:      item.End,
						Emoji:    Insights.Emoji,
						Title:    Insights.Title,
						Content:  Insights.Insight,
						Created:  ts.Unix(),
						Updated:  ts.Unix(),
					}
				}
			}

			result[i] = _summary
		}(i, chunk)
	}

	wg.Wait()

	return result, nil
}
