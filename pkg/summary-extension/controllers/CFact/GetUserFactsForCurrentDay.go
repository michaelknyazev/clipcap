package CFact

import (
	"clipcap/pkg/summary-extension/models/MFact"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserFactsForCurrentDay(userId primitive.ObjectID) ([]MFact.TFact, error) {
	now := time.Now()

	startOfTheDay := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
	endOfTheDay := startOfTheDay.AddDate(0, 0, 1)

	Data, err := MFact.GetByUserIdInTimeRange(userId, startOfTheDay.Unix(), endOfTheDay.Unix())
	if err != nil {
		return []MFact.TFact{}, err
	}

	return Data, nil
}
