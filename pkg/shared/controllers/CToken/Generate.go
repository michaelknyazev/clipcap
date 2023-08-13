package CToken

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func (config *TConfig) Generate() (string, error) {
	claims := &TToken{
		config.Data,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    config.Issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)

	return t.SignedString([]byte(config.Key))
}
