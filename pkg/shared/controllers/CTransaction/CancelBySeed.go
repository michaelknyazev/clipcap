package CTransaction

import (
	"clipcap/pkg/shared/models/MTransaction"
	"time"
)

func CancelBySeed(seed string, data string) (MTransaction.TTransaction, error) {
	Transaction, err := MTransaction.FindOneBySeed(seed)
	if err != nil {
		return MTransaction.TTransaction{}, err
	}

	ts := time.Now()

	Transaction.Data = data
	Transaction.Updated = ts.Unix()
	Transaction.Processed = true
	Transaction.Status = -1

	Updated, err := MTransaction.ReplaceById(Transaction.ID, Transaction)
	if err != nil {
		return MTransaction.TTransaction{}, err
	}

	return Updated, nil
}
