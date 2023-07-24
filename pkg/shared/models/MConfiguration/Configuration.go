package MConfiguration

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Configuration struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	Variable string             `json:"variable" bson:"variable"`
	Value    any                `json:"value" bson:"value"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("configuration")
}
