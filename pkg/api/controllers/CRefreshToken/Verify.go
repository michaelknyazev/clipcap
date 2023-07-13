package CRefreshToken

import (
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CToken"
	"encoding/json"

	"github.com/spf13/viper"
)

func Verify(token string) (types.RefreshToken, error) {
	// TODO: Move this to app initialization
	var refreshTokenKey string
	if err := viper.UnmarshalKey("security.keys.refresh", &refreshTokenKey); err != nil {
		return types.RefreshToken{}, err
	}

	Generator := &CToken.Config{
		Key: refreshTokenKey,
	}
	Data, err := Generator.Verify(token)
	if err != nil {
		return types.RefreshToken{}, err
	}

	var RefreshToken types.RefreshToken
	if err := json.Unmarshal(Data, &RefreshToken); err != nil {
		return types.RefreshToken{}, nil
	}

	return RefreshToken, nil
}
