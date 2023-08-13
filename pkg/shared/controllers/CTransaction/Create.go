package CTransaction

import (
	"clipcap/pkg/shared/models/MTransaction"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(seed string) (MTransaction.TTransaction, error) {
	ts := time.Now()
	Transaction := MTransaction.TTransaction{
		ID:        primitive.NewObjectID(),
		Seed:      seed,
		Processed: false,
		Status:    1,
		Created:   ts.Unix(),
		Updated:   ts.Unix(),
	}

	_, err := MTransaction.Create(Transaction)
	if err != nil {
		return MTransaction.TTransaction{}, err
	}

	return Transaction, nil
}
