package CUser

import (
	"clipcap/pkg/shared/models/MUser"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(email string, password string, name string, active bool) (MUser.TUser, error) {
	ts := time.Now()
	User := MUser.TUser{
		ID:       primitive.NewObjectID(),
		Email:    email,
		Password: password,
		Name:     name,
		Active:   active,
		Created:  ts.Unix(),
		Updated:  ts.Unix(),
	}

	_, err := MUser.Create(User)
	if err != nil {
		return MUser.TUser{}, err
	}

	return User, nil
}
