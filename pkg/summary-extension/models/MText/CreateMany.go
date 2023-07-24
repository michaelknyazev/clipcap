package MText

import (
	"context"
	"time"

	"clipcap/pkg/shared/services/SGoogle"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMany(sourceId string, texts []SGoogle.TCaptionTranscriptTextEntry, language string) ([]Text, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Prepare the documents to be inserted
	var Data []Text
	for _, text := range texts {
		ts := time.Now()
		Data = append(Data, Text{
			ID:           primitive.NewObjectID(),
			SourceID:     sourceId,
			Content:      text.Content,
			Start:        text.Start,
			Duration:     text.Duration,
			LanguageCode: language,
			Created:      ts.Unix(),
			Updated:      ts.Unix(),
		})
	}

	var In []interface{}

	for _, item := range Data {
		In = append(In, item)
	}

	if _, err := GetCollection().InsertMany(ctx, In); err != nil {
		return Data, err
	}

	return Data, nil
}
