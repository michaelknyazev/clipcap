package CToken

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func (config *Config) Generate() (string, error) {
	claims := &Token{
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
