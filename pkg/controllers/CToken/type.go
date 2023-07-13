package CToken

import "github.com/dgrijalva/jwt-go"

type Config struct {
	Key    string
	Issuer string
	Data   any `json:"data"`
}

type Token struct {
	Data any `json:"data"`
	jwt.StandardClaims
}
