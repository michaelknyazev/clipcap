package MSource

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindOneBySourceId(sourceId string) (TSource, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Source TSource

	if err := GetCollection().FindOne(ctx, bson.M{"sourceId": sourceId}).Decode(&Source); err != nil {
		return Source, err
	}

	return Source, nil
}
