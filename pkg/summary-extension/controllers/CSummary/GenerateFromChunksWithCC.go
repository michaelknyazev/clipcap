package CSummary

import (
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/summary-extension/controllers/CGPT"
	"clipcap/pkg/summary-extension/models/MChunk"
	"clipcap/pkg/summary-extension/models/MSummary"
	"clipcap/pkg/summary-extension/prompts"
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"fmt"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GenerateFromChunksWithCC(logger SLog.TLogger, chunks []MChunk.TChunk, GPTCreateChatCompletion CGPT.TCreateChatCompletion) ([]MSummary.TSummary, error) {
	var wg sync.WaitGroup

	result := make([]MSummary.TSummary, len(chunks))
	language := SConfiguration.Configuration.Language

	var langPrompt string
	var titlePrompt string
	var insightPrompt string
	var emojiPrompt string

	switch language {
	case "EN":
		langPrompt = prompts.RU_SUMMARIZE_PROMPT
		titlePrompt = prompts.RU_SUMMARIZE_FUNCTION_TITLE
		emojiPrompt = prompts.RU_SUMMARIZE_FUNCTION_EMOJI
		insightPrompt = prompts.RU_SUMMARIZE_FUNCTION_INSIGHT
		break
	}

	for i, chunk := range chunks {
		wg.Add(1)

		go func(i int, item MChunk.TChunk) {
			defer wg.Done()
			var _summary MSummary.TSummary

			var emoji string
			var title string
			var insight string

			var emojiErr error = nil
			var titleErr error = nil
			var insightErr error = nil

			var maxAttempts int64 = 2
			var retryInSeconds int64 = 3
			var currentAttemptNumber int64

			_done := false
			emojiPrompt = fmt.Sprintf(emojiPrompt, item.RewritedContent)

			for !_done {
				emoji, emojiErr = GPTCreateChatCompletion(logger, []string{}, []string{emojiPrompt})
				if emojiErr != nil {
					logger.Log("#Summary %d: Error while getting an OpenAI response for emoji, continue in %d seconds. Error: %s", i, retryInSeconds, emojiErr.Error())

					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						logger.Log("#Summary %d: Error getting an emoji for chunk after %d attempts. \n\nLangPrompt: %sPrompt: %s", i, currentAttemptNumber, langPrompt, emojiPrompt)
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
					}
				}
			}

			_done = false
			currentAttemptNumber = 0
			retryInSeconds = 3
			titlePrompt = fmt.Sprintf(titlePrompt, item.RewritedContent)
			for !_done {
				title, titleErr = GPTCreateChatCompletion(logger, []string{}, []string{titlePrompt})
				if titleErr != nil {
					logger.Log("#Summary %d: Error while getting an OpenAI response for title, continue in %d seconds. Error: %s", i, retryInSeconds, titleErr.Error())

					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						logger.Log("#Summary %d: Error getting an title for chunk after %d attempts. \n\nLangPrompt: %sPrompt: %s", i, currentAttemptNumber, langPrompt, titlePrompt)
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
					}
				}
			}

			_done = false
			currentAttemptNumber = 0
			retryInSeconds = 3
			insightPrompt = fmt.Sprintf(insightPrompt, item.RewritedContent)
			for !_done {
				insight, insightErr = GPTCreateChatCompletion(logger, []string{}, []string{insightPrompt})
				if insightErr != nil {
					logger.Log("#Summary %d: Error while getting an OpenAI response for insight, continue in %d seconds. Error: %s", i, retryInSeconds, insightErr.Error())

					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						logger.Log("#Summary %d: Error getting an insight for chunk after %d attempts. \n\nLangPrompt: %sPrompt: %s", i, currentAttemptNumber, langPrompt, insightPrompt)
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
					}
				}
			}

			logger.Log("#Summary %d: Chunk summarized!", i)

			_done = true
			ts := time.Now()
			_summary = MSummary.TSummary{
				ID:       primitive.NewObjectID(),
				SourceID: item.SourceID,
				Start:    item.Start,
				End:      item.End,
				Emoji:    emoji,
				Title:    title,
				Content:  insight,
				Created:  ts.Unix(),
				Updated:  ts.Unix(),
			}

			result[i] = _summary
		}(i, chunk)
	}

	wg.Wait()

	return result, nil
}
