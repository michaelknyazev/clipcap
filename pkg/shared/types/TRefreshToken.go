package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TRefreshToken struct {
	AuthorizationId primitive.ObjectID `json:"authorizationId"`
}
