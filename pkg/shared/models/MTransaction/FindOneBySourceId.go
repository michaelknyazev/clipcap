package MTransaction

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindOneBySeed(seed string) (TTransaction, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Transaction TTransaction

	if err := GetCollection().FindOne(ctx, bson.M{"seed": seed}).Decode(&Transaction); err != nil {
		return Transaction, err
	}

	return Transaction, nil
}
