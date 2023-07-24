package MSummary

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Summary struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	SourceID string             `json:"sourceId" bson:"sourceId"`
	Start    float64            `json:"start" bson:"start"`
	End      float64            `json:"end" bson:"end"`
	Emoji    string             `json:"emoji" bson:"emoji"`
	Title    string             `json:"title" bson:"title"`
	Content  string             `json:"content" bson:"content"`
	Created  int64              `json:"created" bson:"created"`
	Updated  int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("summaries")
}
