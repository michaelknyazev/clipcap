package CAuthorization

import (
	"clipcap/pkg/shared/models/MAuthorization"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(userID primitive.ObjectID) (MAuthorization.Authorization, error) {
	ts := time.Now()
	Authorization := MAuthorization.Authorization{
		ID:      primitive.NewObjectID(),
		UserId:  userID,
		Created: ts.Unix(),
		Updated: ts.Unix(),
	}

	_, err := MAuthorization.Create(Authorization)
	if err != nil {
		return MAuthorization.Authorization{}, err
	}

	return Authorization, nil
}
