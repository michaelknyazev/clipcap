package MFact

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetByUserIdInTimeRange(userId primitive.ObjectID, startTs int64, endTs int64) ([]TFact, error) {
	filter := bson.M{
		"userId": userId,
		"created": bson.M{
			"$gte": startTs,
			"$lt":  endTs,
		},
	}

	// Make the query
	cur, err := GetCollection().Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	// Decode the results
	var results []TFact

	err = cur.All(context.Background(), &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}
