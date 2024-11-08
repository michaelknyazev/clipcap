package CSubscription

import (
	"clipcap/pkg/summary-extension/models/MSubscription"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateTrial(userId primitive.ObjectID) (MSubscription.TSubscription, error) {
	ts := time.Now()
	threeDays := ts.AddDate(0, 0, 3)

	Subscription := MSubscription.TSubscription{
		ID:          primitive.NewObjectID(),
		UserID:      userId,
		IsCancelled: false,
		IsTrial:     true,
		Expires:     threeDays.Unix(),
		Created:     ts.Unix(),
		Updated:     ts.Unix(),
	}

	if _, err := MSubscription.Create(Subscription); err != nil {
		return MSubscription.TSubscription{}, err
	}

	return Subscription, nil
}
