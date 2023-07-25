package CFact

import (
	"clipcap/pkg/summary-extension/models/MFact"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserFactsForCurrentMonth(userId primitive.ObjectID) ([]MFact.Fact, error) {
	// Get the current time
	now := time.Now()

	// Calculate the start of the current month
	startOfMonth := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())

	// Calculate the end of the current month
	endOfMonth := startOfMonth.AddDate(0, 1, 0)

	Data, err := MFact.GetByUserIdInTimeRange(userId, startOfMonth.Unix(), endOfMonth.Unix())
	if err != nil {
		return []MFact.Fact{}, err
	}

	return Data, nil
}
