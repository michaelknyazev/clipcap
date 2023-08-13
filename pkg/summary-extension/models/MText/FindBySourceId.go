package MText

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]TText, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []TText

	cursor, err := GetCollection().Find(ctx, bson.M{"sourceId": sourceId})
	if err != nil {
		return []TText{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []TText{}, err
	}

	return Data, nil
}
