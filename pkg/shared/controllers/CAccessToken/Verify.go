package CAccessToken

import (
	"clipcap/pkg/shared/controllers/CToken"
	"clipcap/pkg/shared/types"
	"encoding/json"

	"github.com/spf13/viper"
)

func Verify(token string) (types.TAccessToken, error) {
	// TODO: Move this to app initialization
	var accessTokenKey string
	if err := viper.UnmarshalKey("security.keys.access", &accessTokenKey); err != nil {
		return types.TAccessToken{}, err
	}

	Generator := &CToken.Config{
		Key: accessTokenKey,
	}
	Data, err := Generator.Verify(token)
	if err != nil {
		return types.TAccessToken{}, err
	}

	var AccessToken types.TAccessToken
	if err := json.Unmarshal(Data, &AccessToken); err != nil {
		return types.TAccessToken{}, err
	}

	return AccessToken, nil
}
