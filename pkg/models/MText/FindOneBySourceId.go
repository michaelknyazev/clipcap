package MText

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindBySourceId(sourceId string) ([]Text, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Data []Text

	cursor, err := GetCollection().Find(ctx, bson.M{"sourceId": sourceId})
	if err != nil {
		return []Text{}, err
	}

	if err := cursor.All(ctx, &Data); err != nil {
		return []Text{}, err
	}

	return Data, nil
}
