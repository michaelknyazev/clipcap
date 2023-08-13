package CTransaction

import (
	"clipcap/pkg/shared/models/MTransaction"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindById(transactionId primitive.ObjectID) (MTransaction.TTransaction, error) {
	User, err := MTransaction.FindOneById(transactionId)
	if err != nil {
		return MTransaction.TTransaction{}, err
	}

	return User, nil
}
