package MActivity

import (
	"clipcap/pkg/shared/database"
	"clipcap/pkg/shared/models/MUser"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TActivity struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id"`
	Tags    []interface{}      `json:"tags" bson:"tags"`
	UserId  primitive.ObjectID `json:"userId" bson:"userId" lungo:"users:_id:user"`
	Event   string             `json:"event" bson:"event"`
	Message string             `json:"message" bson:"message"`
	Created int64              `json:"created" bson:"created"`
}

type TActivityWithUser struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id"`
	Tags    []interface{}      `json:"tags" bson:"tags"`
	UserId  primitive.ObjectID `json:"userId" bson:"userId" lungo:"users:_id:user"`
	Event   string             `json:"event" bson:"event"`
	Message string             `json:"message" bson:"message"`
	Created int64              `json:"created" bson:"created"`
	User    []MUser.TUser      `json:"user"`
}

func GetCollection() *mongo.Collection {
	return database.GetCollection("activity")
}
