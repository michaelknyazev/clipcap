package CAccessToken

import (
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CToken"

	"github.com/spf13/viper"
)

func Generate(Issuer string, Data *types.AccessToken) (string, error) {
	// TODO: Move this to app initialization
	var accessTokenKey string
	if err := viper.UnmarshalKey("security.keys.access", &accessTokenKey); err != nil {
		return "", err
	}

	Generator := &CToken.Config{
		Key:    accessTokenKey,
		Issuer: Issuer,
		Data:   Data,
	}

	return Generator.Generate()
}
