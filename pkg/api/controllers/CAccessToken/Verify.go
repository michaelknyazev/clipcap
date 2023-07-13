package CAccessToken

import (
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/controllers/CToken"
	"encoding/json"

	"github.com/spf13/viper"
)

func Verify(token string) (types.AccessToken, error) {
	// TODO: Move this to app initialization
	var accessTokenKey string
	if err := viper.UnmarshalKey("security.keys.access", &accessTokenKey); err != nil {
		return types.AccessToken{}, err
	}

	Generator := &CToken.Config{
		Key: accessTokenKey,
	}
	Data, err := Generator.Verify(token)
	if err != nil {
		return types.AccessToken{}, err
	}

	var AccessToken types.AccessToken
	if err := json.Unmarshal(Data, &AccessToken); err != nil {
		return types.AccessToken{}, err
	}

	return AccessToken, nil
}
