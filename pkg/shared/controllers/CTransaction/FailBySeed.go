package CTransaction

import (
	"clipcap/pkg/shared/models/MTransaction"
	"time"
)

func FailBySeed(seed string, data string) (MTransaction.Transaction, error) {
	Transaction, err := MTransaction.FindOneBySeed(seed)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	ts := time.Now()

	Transaction.Data = data
	Transaction.Updated = ts.Unix()
	Transaction.Processed = true
	Transaction.Status = 0

	Updated, err := MTransaction.ReplaceById(Transaction.ID, Transaction)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	return Updated, nil
}
