package CRefreshToken

import (
	"clipcap/pkg/shared/controllers/CToken"
	"clipcap/pkg/shared/types"

	"github.com/spf13/viper"
)

func Generate(Issuer string, Data types.TRefreshToken) (string, error) {
	// TODO: Move this to app initialization
	var refreshTokenKey string
	if err := viper.UnmarshalKey("security.keys.refresh", &refreshTokenKey); err != nil {
		return "", err
	}

	Generator := &CToken.TConfig{
		Key:    refreshTokenKey,
		Issuer: Issuer,
		Data:   Data,
	}

	return Generator.Generate()
}
