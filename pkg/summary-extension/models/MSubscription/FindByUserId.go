package MSubscription

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindByUserId(userId primitive.ObjectID) ([]TSubscription, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []TSubscription

	cursor, err := GetCollection().Find(ctx, bson.M{"userId": userId})
	if err != nil {
		return []TSubscription{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []TSubscription{}, err
	}

	return Data, nil
}
