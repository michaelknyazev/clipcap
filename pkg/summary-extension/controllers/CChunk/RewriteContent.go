package CChunk

import (
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/summary-extension/controllers/CGPT"
	"clipcap/pkg/summary-extension/models/MChunk"
	"clipcap/pkg/summary-extension/prompts"
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"fmt"
	"sync"
	"time"
)

func RewriteContent(logger SLog.TLogger, chunks []MChunk.TChunk, RewriteText CGPT.TCreateChatCompletion) ([]MChunk.TChunk, error) {
	language := SConfiguration.Configuration.Language
	result := make([]MChunk.TChunk, len(chunks))

	var wg sync.WaitGroup
	var langPrompt string

	switch language {
	case "EN":
		langPrompt = prompts.EN_REWRITE_CHUNK
		break
	}

	for i, chunk := range chunks {
		wg.Add(1)

		go func(i int, item MChunk.TChunk) {
			defer wg.Done()

			_done := false
			original := item.OriginalContent
			prompt := fmt.Sprintf(langPrompt, original)

			var maxAttempts int64 = 2
			var retryInSeconds int64 = 3
			var currentAttemptNumber int64

			for !_done {
				text, err := RewriteText(logger, []string{}, []string{prompt})
				if err != nil {
					logger.Log("#Chunk Rewrite %d: Error while getting an OpenAI response, continue in %d seconds...", i, retryInSeconds)
					time.Sleep(time.Duration(retryInSeconds) * time.Second)

					if currentAttemptNumber >= maxAttempts {
						_done = true
						logger.Log("#Chunk Rewrite %d: Error rewriting chunk after %d attempts. \n\nSystem Prompt: %s\nLangPrompt: %s\nContent: %s", i, currentAttemptNumber, langPrompt, item.OriginalContent, "\n")
					} else {
						retryInSeconds += retryInSeconds
						currentAttemptNumber += 1
					}
				} else {
					logger.Log("#Chunk Rewrite %d: Done!", i)

					_done = true
					item.RewritedContent = text
				}
			}

			result[i] = item
		}(i, chunk)
	}

	wg.Wait()

	return result, nil
}
