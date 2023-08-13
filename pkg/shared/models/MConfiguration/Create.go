package MConfiguration

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

func Create(data TConfiguration) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return GetCollection().InsertOne(ctx, data)
}
