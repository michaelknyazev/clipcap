package CRefreshToken

import (
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CToken"

	"github.com/spf13/viper"
)

func Generate(Issuer string, Data *types.RefreshToken) (string, error) {
	// TODO: Move this to app initialization
	var refreshTokenKey string
	if err := viper.UnmarshalKey("security.keys.refresh", &refreshTokenKey); err != nil {
		return "", err
	}

	Generator := &CToken.Config{
		Key:    refreshTokenKey,
		Issuer: Issuer,
		Data:   Data,
	}

	return Generator.Generate()
}
