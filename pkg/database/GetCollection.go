package database

import (
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCollection(name string) *mongo.Collection {
	collection := connection.Database(configuration.Name).Collection(name)

	return collection
}
