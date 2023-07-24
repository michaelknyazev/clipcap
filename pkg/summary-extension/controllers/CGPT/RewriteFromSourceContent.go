package CGPT

import (
	"clipcap/pkg/shared/controllers/CHelper"
	"clipcap/pkg/shared/services/SChatGPT"
	"clipcap/pkg/summary-extension/models/MText"
	"fmt"
	"strings"
	"sync"
)

func RewriteFromSourceContent(videoId string, sourceContent []MText.Text) (string, error) {
	var Texts []string

	for _, text := range sourceContent {
		Texts = append(Texts, text.Content)
	}

	message := strings.Join(Texts, "")

	tokenLength := len(message) / 4

	if tokenLength < maxTokens {
		systemHeaderPrompt := `Imagine that you are a content writer. Here is a task for you:
		Rewrite this video transcription to a Markdown article.
		Do not include the template for any author info, do not mention that this is an article.
		Provide just the Article, no conversation.
		`

		chat, err := SChatGPT.CreateChat(systemHeaderPrompt, message)
		if err != nil || len(chat.Choices) == 0 {
			return "", err
		}

		return chat.Choices[0].Message.Content, nil
	}

	systemHeaderPrompt := `
Rewrite this video transcription to a Markdown article.
Do not include the template for any author info, do not mention that this is a Markdown formatted article.
Provide just the Article, no conversation.
`

	var wg sync.WaitGroup

	strChunks := CHelper.SplitStringInChunks(message, maxTokens*2)
	results := make([]SChatGPT.TGPTResponse, len(strChunks))

	for i, chunk := range strChunks {
		wg.Add(1)

		go func(i int, chunk string) {
			defer wg.Done()

			systemHeaderPrompt = fmt.Sprintf("%s\nThis is Part %d of whole particle.\n There will be %d parts.", systemHeaderPrompt, i+1, len(strChunks))

			chat, _ := SChatGPT.CreateChat(systemHeaderPrompt, chunk)
			results[i] = chat
		}(i, chunk)
	}

	wg.Wait()

	var combined []string

	for _, chat := range results {
		if len(chat.Choices) != 0 {
			combined = append(combined, chat.Choices[0].Message.Content)
		}
	}

	return strings.Join(combined, " "), nil
}
