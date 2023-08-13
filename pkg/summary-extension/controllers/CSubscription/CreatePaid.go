package CSubscription

import (
	"clipcap/pkg/summary-extension/models/MSubscription"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePaid(userId primitive.ObjectID, subscriptionId string) (MSubscription.TSubscription, error) {
	ts := time.Now()
	oneMonth := ts.AddDate(0, 1, 0)

	Subscription := MSubscription.TSubscription{
		ID:             primitive.NewObjectID(),
		SubscriptionID: subscriptionId,
		UserID:         userId,
		IsCancelled:    false,
		IsTrial:        false,
		Expires:        oneMonth.Unix(),
		Created:        ts.Unix(),
		Updated:        ts.Unix(),
	}

	if _, err := MSubscription.Create(Subscription); err != nil {
		return MSubscription.TSubscription{}, err
	}

	return Subscription, nil
}
