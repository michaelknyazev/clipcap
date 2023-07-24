package SChatGPT

import (
	"errors"

	"github.com/spf13/viper"
)

var AccessToken string

func Init() error {
	token := viper.GetString("integrations.chatgpt.api_key")

	if token == "" {
		return errors.New("Missing chatgpt token")
	}

	AccessToken = token

	return nil
}
