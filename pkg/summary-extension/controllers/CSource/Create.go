package CSource

import (
	"clipcap/pkg/summary-extension/models/MSource"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(sourceType string, sourceId string, sourceUrl string) (MSource.TSource, error) {
	ts := time.Now()
	Source := MSource.TSource{
		ID:       primitive.NewObjectID(),
		SourceID: sourceId,
		Type:     sourceType,
		URL:      sourceUrl,
		Created:  ts.Unix(),
		Updated:  ts.Unix(),
	}

	_, err := MSource.Create(Source)
	if err != nil {
		return MSource.TSource{}, err
	}

	return Source, nil
}
