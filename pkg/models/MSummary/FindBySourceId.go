package MSummary

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindBySourceId(sourceId string) ([]Summary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []Summary

	cursor, err := GetCollection().Find(ctx, bson.M{"sourceId": sourceId})
	if err != nil {
		return []Summary{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []Summary{}, err
	}

	return Data, nil
}
