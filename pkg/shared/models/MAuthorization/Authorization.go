package MAuthorization

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Authorization struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id"`
	UserId  primitive.ObjectID `json:"userId" bson:"userId"`
	Created int64              `json:"created" bson:"created"`
	Updated int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("authorizations")
}
