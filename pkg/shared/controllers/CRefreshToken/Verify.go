package CRefreshToken

import (
	"clipcap/pkg/shared/controllers/CToken"
	"clipcap/pkg/shared/types"
	"encoding/json"

	"github.com/spf13/viper"
)

func Verify(token string) (types.TRefreshToken, error) {
	// TODO: Move this to app initialization
	var refreshTokenKey string
	if err := viper.UnmarshalKey("security.keys.refresh", &refreshTokenKey); err != nil {
		return types.TRefreshToken{}, err
	}

	Generator := &CToken.TConfig{
		Key: refreshTokenKey,
	}
	Data, err := Generator.Verify(token)
	if err != nil {
		return types.TRefreshToken{}, err
	}

	var RefreshToken types.TRefreshToken
	if err := json.Unmarshal(Data, &RefreshToken); err != nil {
		return types.TRefreshToken{}, nil
	}

	return RefreshToken, nil
}
