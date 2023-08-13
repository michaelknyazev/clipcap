package CAuthorization

import (
	"clipcap/pkg/shared/models/MAuthorization"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindById(authorizationId primitive.ObjectID) (MAuthorization.TAuthorization, error) {
	Authorization, err := MAuthorization.FindOneById(authorizationId)
	if err != nil {
		return MAuthorization.TAuthorization{}, err
	}

	return Authorization, nil
}
