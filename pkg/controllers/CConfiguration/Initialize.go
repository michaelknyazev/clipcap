package CConfiguration

import (
	"clipcap/web/pkg/models/MConfiguration"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Initialize() error {
	config := MConfiguration.Configuration{
		ID:       primitive.NewObjectID(),
		Variable: "initialized",
		Value:    true,
	}

	_, err := MConfiguration.Create(config)

	return err
}
