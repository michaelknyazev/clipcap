package MAuthorization

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RemoveById(authorizationId primitive.ObjectID) (interface{}, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := GetCollection().DeleteOne(ctx, bson.M{"_id": authorizationId})

	return result, err
}
