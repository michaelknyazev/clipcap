package CGPT

import (
	"clipcap/pkg/shared/services/SChatGPT"
	"clipcap/pkg/shared/services/SLog"
)

type TCreateChatCompletion func(SLog.TLogger, []string, []string) (string, error)

func CreateChatCompletion_GPT_3_5_4K(logger SLog.TLogger, systemPrompts []string, prompts []string) (string, error) {
	return createChatCompletion(logger, GPT_MODEL_3_5_4K, systemPrompts, prompts)
}

func CreateChatCompletion_GPT_3_5_16K(logger SLog.TLogger, systemPrompts []string, prompts []string) (string, error) {
	return createChatCompletion(logger, GPT_MODEL_3_5_16K, systemPrompts, prompts)
}

func CreateChatCompletion_GPT_4_8K(logger SLog.TLogger, systemPrompts []string, prompts []string) (string, error) {
	return createChatCompletion(logger, GPT_MODEL_4_8K, systemPrompts, prompts)
}

func CreateChatCompletion_GPT_4_32K(logger SLog.TLogger, systemPrompts []string, prompts []string) (string, error) {
	return createChatCompletion(logger, GPT_MODEL_4_32K, systemPrompts, prompts)
}

func createChatCompletion(logger SLog.TLogger, model string, systemPrompts []string, prompts []string) (string, error) {
	chat, err := SChatGPT.CreateChat(logger, model, systemPrompts, prompts)
	if err != nil || len(chat.Choices) == 0 {
		return "", err
	}

	return chat.Choices[0].Message.Content, nil
}
