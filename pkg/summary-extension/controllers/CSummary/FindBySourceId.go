package CSummary

import (
	"clipcap/pkg/summary-extension/models/MSummary"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]MSummary.TSummary, error) {
	Content, err := MSummary.FindBySourceId(sourceId)
	if err != nil {
		return []MSummary.TSummary{}, err
	}

	return Content, nil
}
