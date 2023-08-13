package CToken

import (
	"encoding/json"
	"errors"

	"github.com/dgrijalva/jwt-go"
)

func (config *TConfig) Verify(encoded string) ([]byte, error) {
	token, err := jwt.Parse(encoded, func(token *jwt.Token) (interface{}, error) {
		if _, isValid := token.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, errors.New("invalid token")
		}

		return []byte(config.Key), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, err := json.Marshal(token.Claims)
	if err != nil {
		return nil, err
	}

	var TokenData TToken
	if err := json.Unmarshal(claims, &TokenData); err != nil {
		return nil, err
	}

	result, err := json.Marshal(TokenData.Data)
	if err != nil {
		return nil, err
	}

	return result, nil
}
