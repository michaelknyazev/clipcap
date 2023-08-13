package CChunk

import (
	"clipcap/pkg/summary-extension/models/MChunk"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindBySourceId(sourceId primitive.ObjectID) ([]MChunk.TChunk, error) {
	Content, err := MChunk.FindBySourceId(sourceId)
	if err != nil {
		return []MChunk.TChunk{}, err
	}

	return Content, nil
}
