package MChunk

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]TChunk, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []TChunk

	cursor, err := GetCollection().Find(ctx, bson.M{"sourceId": sourceId})
	if err != nil {
		return []TChunk{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []TChunk{}, err
	}

	return Data, nil
}
