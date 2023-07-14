package CGPT

import "clipcap/web/pkg/services/SChatGPT"

func SummarizeText(text string) (string, error) {
	systemHeaderPrompt := `
I need you to summarize the provided article in bullet points.
Each bulletpoint must be represented with one unique emoji of your choice.
Provide just a summary, no conversation.
`

	chat, err := SChatGPT.CreateChat(systemHeaderPrompt, text)
	if err != nil || len(chat.Choices) == 0 {
		return "", err
	}

	return chat.Choices[0].Message.Content, nil
}
