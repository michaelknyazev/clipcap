package MSubscription

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindOneById(subscriptionId primitive.ObjectID) (Subscription, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result := GetCollection().FindOne(ctx, bson.M{"_id": subscriptionId})
	var Subscription Subscription

	if err := result.Decode(&Subscription); err != nil {
		return Subscription, err
	}

	return Subscription, nil
}
