package CTransaction

import (
	"clipcap/pkg/shared/models/MTransaction"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(seed string) (MTransaction.Transaction, error) {
	ts := time.Now()
	Transaction := MTransaction.Transaction{
		ID:        primitive.NewObjectID(),
		Seed:      seed,
		Processed: false,
		Status:    1,
		Created:   ts.Unix(),
		Updated:   ts.Unix(),
	}

	_, err := MTransaction.Create(Transaction)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	return Transaction, nil
}
