package MConfiguration

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindOneByVariableName(variable string) (TConfiguration, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Configuration TConfiguration

	if err := GetCollection().FindOne(ctx, bson.M{"variable": variable}).Decode(&Configuration); err != nil {
		return Configuration, err
	}

	return Configuration, nil
}
