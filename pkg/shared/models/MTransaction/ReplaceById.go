package MTransaction

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ReplaceById(transactionId primitive.ObjectID, data Transaction) (Transaction, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := GetCollection().ReplaceOne(ctx, bson.M{"_id": transactionId}, data)
	if err != nil {
		return Transaction{}, err
	}

	return data, nil
}
