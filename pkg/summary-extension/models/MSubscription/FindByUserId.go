package MSubscription

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindByUserId(userId primitive.ObjectID) ([]Subscription, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []Subscription

	cursor, err := GetCollection().Find(ctx, bson.M{"userId": userId})
	if err != nil {
		return []Subscription{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []Subscription{}, err
	}

	return Data, nil
}
