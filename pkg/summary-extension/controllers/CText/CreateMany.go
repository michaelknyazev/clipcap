package CText

import (
	"clipcap/pkg/shared/services/SGoogle"
	"clipcap/pkg/summary-extension/models/MText"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMany(sourceId primitive.ObjectID, texts []SGoogle.TCaptionTranscriptTextEntry, language string) ([]MText.TText, error) {
	Content, err := MText.CreateMany(sourceId, texts, language)
	if err != nil {
		return nil, err
	}

	return Content, nil
}
