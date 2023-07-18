package CTransaction

import (
	"clipcap/web/pkg/models/MTransaction"
	"time"
)

func CompleteBySeed(seed string, data string) (MTransaction.Transaction, error) {
	Transaction, err := MTransaction.FindOneBySeed(seed)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	ts := time.Now()

	Transaction.Data = data
	Transaction.Updated = ts.Unix()
	Transaction.Processed = true

	Updated, err := MTransaction.ReplaceById(Transaction.ID, Transaction)
	if err != nil {
		return MTransaction.Transaction{}, err
	}

	return Updated, nil
}
