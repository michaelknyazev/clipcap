package CToken

import "github.com/dgrijalva/jwt-go"

type TConfig struct {
	Key    string
	Issuer string
	Data   any `json:"data"`
}

type TToken struct {
	Data any `json:"data"`
	jwt.StandardClaims
}
