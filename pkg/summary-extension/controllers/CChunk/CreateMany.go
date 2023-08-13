package CChunk

import (
	"clipcap/pkg/summary-extension/models/MChunk"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMany(sourceId primitive.ObjectID, chunks []MChunk.TChunk) ([]MChunk.TChunk, error) {
	// Prepare the documents to be inserted
	for _, item := range chunks {
		ts := time.Now()

		item.ID = primitive.NewObjectID()
		item.Created = ts.Unix()
		item.Updated = ts.Unix()
		item.SourceID = sourceId
	}

	if _, err := MChunk.CreateMany(chunks); err != nil {
		return nil, err
	}

	return chunks, nil
}
