package MText

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TText struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	SourceID     primitive.ObjectID `json:"sourceId" bson:"sourceId"`
	Content      string             `json:"content" bson:"content"`
	LanguageCode string             `json:"languageCode" bson:"languageCode"`
	Start        float64            `json:"start" bson:"start"`
	Duration     float64            `json:"duration" bson:"duration"`
	Created      int64              `json:"created" bson:"created"`
	Updated      int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("texts")
}
