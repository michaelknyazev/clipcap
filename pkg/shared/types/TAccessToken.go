package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type TAccessToken struct {
	UserID primitive.ObjectID `json:"userId"`
}
