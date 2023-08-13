package MIntegration

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ReplaceById(integrationId primitive.ObjectID, data TIntegration) (TIntegration, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := GetCollection().ReplaceOne(ctx, bson.M{"_id": integrationId}, data)
	if err != nil {
		return TIntegration{}, err
	}

	return data, nil
}
