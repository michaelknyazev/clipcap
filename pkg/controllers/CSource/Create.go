package CSource

import (
	"clipcap/web/pkg/models/MSource"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(sourceType string, sourceId string, sourceUrl string) (MSource.Source, error) {
	ts := time.Now()
	Source := MSource.Source{
		ID:       primitive.NewObjectID(),
		SourceID: sourceId,
		Type:     sourceType,
		URL:      sourceUrl,
		Created:  ts.Unix(),
		Updated:  ts.Unix(),
	}

	_, err := MSource.Create(Source)
	if err != nil {
		return MSource.Source{}, err
	}

	return Source, nil
}
