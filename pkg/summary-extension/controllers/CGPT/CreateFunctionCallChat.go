package CGPT

import (
	"clipcap/pkg/shared/services/SChatGPT"
	"clipcap/pkg/shared/services/SLog"
	"encoding/json"
	"errors"
)

type TCreateFunctionCallChat func(SLog.TLogger, []string, []string, SChatGPT.TChatGPTFunction, interface{}) error

func CreateFunctionCallChat_GPT_3_5_4k(logger SLog.TLogger, systemPrompts []string, prompt []string, function SChatGPT.TChatGPTFunction, target interface{}) error {
	return createFunctionCallChat(logger, GPT_MODEL_3_5_4K, systemPrompts, prompt, function, target)
}

func CreateFunctionCallChat_GPT_3_5_16k(logger SLog.TLogger, systemPrompts []string, prompt []string, function SChatGPT.TChatGPTFunction, target interface{}) error {
	return createFunctionCallChat(logger, GPT_MODEL_3_5_16K, systemPrompts, prompt, function, target)
}

func CreateFunctionCallChat_GPT_4_8k(logger SLog.TLogger, systemPrompts []string, prompt []string, function SChatGPT.TChatGPTFunction, target interface{}) error {
	return createFunctionCallChat(logger, GPT_MODEL_4_8K, systemPrompts, prompt, function, target)
}

func CreateFunctionCallChat_GPT_3_5_32k(logger SLog.TLogger, systemPrompts []string, prompt []string, function SChatGPT.TChatGPTFunction, target interface{}) error {
	return createFunctionCallChat(logger, GPT_MODEL_4_32K, systemPrompts, prompt, function, target)
}

func createFunctionCallChat(logger SLog.TLogger, model string, systemPrompts []string, prompt []string, function SChatGPT.TChatGPTFunction, target interface{}) error {
	chat, err := SChatGPT.CreateFunctionCallChat(logger, model, systemPrompts, prompt, function)
	if err != nil || len(chat.Choices) == 0 {
		return err
	}

	if len(chat.Choices[0].Message.FunctionCall.Arguments) == 0 {
		return errors.New("no function response from gpt")
	}

	return json.Unmarshal([]byte(chat.Choices[0].Message.FunctionCall.Arguments), &target)
}
