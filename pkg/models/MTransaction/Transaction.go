package MTransaction

import (
	"clipcap/web/pkg/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Transaction struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	Seed      string             `json:"seed" bson:"seed"`
	Processed bool               `json:"processed" bson:"processed"`
	Data      string             `json:"data" bson:"data"`
	Created   int64              `json:"created" bson:"created"`
	Updated   int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("transactions")
}
