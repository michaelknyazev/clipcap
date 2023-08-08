package CSubscription

import (
	"clipcap/pkg/summary-extension/models/MSubscription"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindActiveByUserId(userId primitive.ObjectID) (MSubscription.Subscription, error) {
	Subscriptions, err := MSubscription.FindByUserId(userId)
	if err != nil {
		return MSubscription.Subscription{}, err
	}

	if len(Subscriptions) == 0 {
		return MSubscription.Subscription{}, errors.New("no subscription for user")
	}

	ts := time.Now()
	ActiveSubscriptionExists := false

	var ActiveSubscription MSubscription.Subscription

	for _, sub := range Subscriptions {
		if sub.Expires > ts.Unix() {
			ActiveSubscription = sub
			ActiveSubscriptionExists = true
		}
	}

	if !ActiveSubscriptionExists {
		return MSubscription.Subscription{}, errors.New("No active subscription")
	}

	return ActiveSubscription, nil
}
