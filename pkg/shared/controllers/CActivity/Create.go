package CActivity

import (
	"clipcap/pkg/shared/models/MActivity"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(tags []interface{}, userId primitive.ObjectID, event string, message string) (MActivity.TActivity, error) {
	ts := time.Now()

	Activity := MActivity.TActivity{
		ID:      primitive.NewObjectID(),
		Tags:    tags,
		UserId:  userId,
		Event:   event,
		Message: message,
		Created: ts.Unix(),
	}

	_, err := MActivity.Create(Activity)
	if err != nil {
		return MActivity.TActivity{}, err
	}

	return Activity, nil
}
