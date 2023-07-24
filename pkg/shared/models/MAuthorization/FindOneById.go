package MAuthorization

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindOneById(authorizationId primitive.ObjectID) (Authorization, error) {
	pipeline := bson.A{
		bson.D{
			bson.E{
				Key: "$match",
				Value: bson.D{
					bson.E{
						Key:   "_id",
						Value: authorizationId,
					},
				},
			},
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := GetCollection().Aggregate(ctx, pipeline)
	if err != nil {
		return Authorization{}, err
	}

	var result []map[string]interface{}

	if err := cursor.All(ctx, &result); err != nil {
		return Authorization{}, err
	}

	data, err := json.Marshal(result)
	if err != nil {
		return Authorization{}, err
	}

	var Data []Authorization

	if err := json.Unmarshal(data, &Data); err != nil {
		return Authorization{}, err
	}

	if len(Data) == 0 {
		return Authorization{}, errors.New("not found")
	}

	return Data[0], nil

}
