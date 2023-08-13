package MActivity

import (
	"context"
	"encoding/json"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func SearchByTag(tag string) ([]TActivityWithUser, error) {
	pipeline := bson.A{
		bson.D{
			bson.E{
				Key: "$match",
				Value: bson.D{
					bson.E{
						Key: "tag",
						Value: bson.D{
							bson.E{
								Key:   "$in",
								Value: bson.A{tag},
							},
						},
					},
				},
			},
		},
		bson.D{
			bson.E{
				Key: "$lookup",
				Value: bson.D{
					bson.E{
						Key:   "from",
						Value: "users",
					},
					bson.E{
						Key:   "localField",
						Value: "userId",
					},
					bson.E{
						Key:   "foreignField",
						Value: "_id",
					},
					bson.E{
						Key:   "as",
						Value: "user",
					},
				},
			},
		},
		bson.D{
			bson.E{
				Key: "$sort",
				Value: bson.D{
					bson.E{"_id", -1},
				},
			},
		},
		bson.D{
			bson.E{
				Key:   "$limit",
				Value: 5,
			},
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := GetCollection().Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}

	var result []map[string]interface{}

	if err := cursor.All(ctx, &result); err != nil {
		return nil, err
	}

	data, err := json.Marshal(result)
	if err != nil {
		return nil, err
	}

	var Data []TActivityWithUser

	if err := json.Unmarshal(data, &Data); err != nil {
		return nil, err
	}

	return Data, nil
}
