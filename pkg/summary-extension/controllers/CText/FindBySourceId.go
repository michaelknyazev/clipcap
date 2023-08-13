package CText

import (
	"clipcap/pkg/summary-extension/models/MText"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]MText.TText, error) {
	Content, err := MText.FindBySourceId(sourceId)
	if err != nil {
		return []MText.TText{}, err
	}

	return Content, nil
}
