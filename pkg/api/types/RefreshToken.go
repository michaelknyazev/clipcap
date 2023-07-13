package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RefreshToken struct {
	AuthorizationId primitive.ObjectID `json:"authorizationId"`
}
