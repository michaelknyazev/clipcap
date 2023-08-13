package MSummary

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]TSummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []TSummary

	cursor, err := GetCollection().Find(ctx, bson.M{"sourceId": sourceId})
	if err != nil {
		return []TSummary{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []TSummary{}, err
	}

	return Data, nil
}
