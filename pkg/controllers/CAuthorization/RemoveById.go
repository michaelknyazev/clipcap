package CAuthorization

import (
	"clipcap/web/pkg/models/MAuthorization"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RemoveById(authorizationId primitive.ObjectID) error {
	_, err := MAuthorization.RemoveById(authorizationId)

	return err
}
