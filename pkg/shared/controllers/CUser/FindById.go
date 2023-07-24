package CUser

import (
	"clipcap/pkg/shared/models/MUser"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindById(userId primitive.ObjectID) (MUser.User, error) {
	User, err := MUser.FindOneById(userId)
	if err != nil {
		return MUser.User{}, err
	}

	return User, nil
}
