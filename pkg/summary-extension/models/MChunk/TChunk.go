package MChunk

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TChunk struct {
	ID              primitive.ObjectID `json:"_id" bson:"_id"`
	SourceID        primitive.ObjectID `json:"sourceId" bson:"sourceId"`
	Size            int                `json:"size" bson:"size"`
	Start           float64            `json:"start" bson:"start"`
	End             float64            `json:"end" bson:"end"`
	Language        string             `json:"language" bson:"language"`
	OriginalContent string             `json:"original_content" bson:"original_content"`
	RewritedContent string             `json:"rewrited_content" bson:"rewrited_content"`
	Created         int64              `json:"created" bson:"created"`
	Updated         int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("chunks")
}
