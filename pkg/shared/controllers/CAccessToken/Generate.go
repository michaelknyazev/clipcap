package CAccessToken

import (
	"clipcap/pkg/shared/controllers/CToken"
	"clipcap/pkg/shared/types"

	"github.com/spf13/viper"
)

func Generate(Issuer string, Data types.TAccessToken) (string, error) {
	// TODO: Move this to app initialization
	var accessTokenKey string
	if err := viper.UnmarshalKey("security.keys.access", &accessTokenKey); err != nil {
		return "", err
	}

	Generator := &CToken.TConfig{
		Key:    accessTokenKey,
		Issuer: Issuer,
		Data:   Data,
	}

	return Generator.Generate()
}
