package MTransaction

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindOneById(transactionId primitive.ObjectID) (Transaction, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result := GetCollection().FindOne(ctx, bson.M{"_id": transactionId})
	var Transaction Transaction

	if err := result.Decode(&Transaction); err != nil {
		return Transaction, err
	}

	return Transaction, nil
}
