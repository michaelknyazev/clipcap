package MIntegration

import (
	"clipcap/web/pkg/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Integration struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	UserID       primitive.ObjectID `json:"userId" bson:"userId"`
	RefreshToken string             `json:"refresh_token" bson:"refresh_token"`
	AccessToken  string             `json:"access_token" bson:"access_token"`
	Type         string             `json:"type" bson:"type"`
	Expiry       int64              `json:"expiry" bson:"expiry"`
	Created      int64              `json:"created" bson:"created"`
	Updated      int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("integrations")
}
