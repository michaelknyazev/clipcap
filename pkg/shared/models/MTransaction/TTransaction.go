package MTransaction

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TTransaction struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	Seed      string             `json:"seed" bson:"seed"`
	Processed bool               `json:"processed" bson:"processed"`
	Status    int64              `json:"status" bson:"status"` // -1 = cancelled, 0 = failed, 1 = in_progress, 2 = success
	Data      string             `json:"data" bson:"data"`
	Created   int64              `json:"created" bson:"created"`
	Updated   int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("transactions")
}
