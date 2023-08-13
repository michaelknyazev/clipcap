package MSubscription

import (
	"clipcap/pkg/shared/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TSubscription struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	SubscriptionID string             `json:"subscription_id" bson:"subscription_id"`
	IsCancelled    bool               `json:"isCancelled" bson:"isCancelled"`
	IsTrial        bool               `json:"isTrial" bson:"isTrial"`
	UserID         primitive.ObjectID `json:"userId" bson:"userId"`
	Expires        int64              `json:"expires" bson:"expires"`
	Created        int64              `json:"created" bson:"created"`
	Updated        int64              `json:"updated" bson:"updated"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("subscriptions")
}
