package CTransaction

import (
	"clipcap/web/pkg/models/MTransaction"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindById(transactionId primitive.ObjectID) (MTransaction.Transaction, error) {
	User, err := MTransaction.FindOneById(transactionId)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	return User, nil
}
