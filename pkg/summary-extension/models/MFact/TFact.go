package MFact

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TFact struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	SourceID primitive.ObjectID `json:"sourceId" bson:"sourceId"`
	UserID   primitive.ObjectID `json:"userId" bson:"userId"`
	Created  int64              `json:"created" bson:"created"`
	Updated  int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("facts")
}
