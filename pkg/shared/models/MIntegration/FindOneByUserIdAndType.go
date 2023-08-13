package MIntegration

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindOneByUserIdAndType(userId primitive.ObjectID, integrationType string) (TIntegration, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result := GetCollection().FindOne(ctx, bson.M{"userId": userId, "type": integrationType})

	var Integration TIntegration

	if err := result.Decode(&Integration); err != nil {
		return Integration, err
	}

	return Integration, nil

}
