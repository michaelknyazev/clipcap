package CFact

import (
	"clipcap/pkg/summary-extension/models/MFact"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserFactsForCurrentMonth(userId primitive.ObjectID) ([]MFact.TFact, error) {
	now := time.Now()

	startOfMonth := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	endOfMonth := startOfMonth.AddDate(0, 1, 0)

	Data, err := MFact.GetByUserIdInTimeRange(userId, startOfMonth.Unix(), endOfMonth.Unix())
	if err != nil {
		return []MFact.TFact{}, err
	}

	return Data, nil
}
