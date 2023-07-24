package MSource

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Source struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	SourceID string             `json:"sourceId" bson:"sourceId"`
	Type     string             `json:"_type" bson:"_type"`
	URL      string             `json:"url" bson:"url"`
	Created  int64              `json:"created" bson:"created"`
	Updated  int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("sources")
}
