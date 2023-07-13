package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type AccessToken struct {
	UserID primitive.ObjectID `json:"userId"`
}
