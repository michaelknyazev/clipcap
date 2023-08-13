package CAuthorization

import (
	"clipcap/pkg/shared/models/MAuthorization"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(userID primitive.ObjectID) (MAuthorization.TAuthorization, error) {
	ts := time.Now()
	Authorization := MAuthorization.TAuthorization{
		ID:      primitive.NewObjectID(),
		UserId:  userID,
		Created: ts.Unix(),
		Updated: ts.Unix(),
	}

	_, err := MAuthorization.Create(Authorization)
	if err != nil {
		return MAuthorization.TAuthorization{}, err
	}

	return Authorization, nil
}
