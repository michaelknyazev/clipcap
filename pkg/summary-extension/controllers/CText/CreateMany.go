package CText

import (
	"clipcap/pkg/shared/services/SGoogle"
	"clipcap/pkg/summary-extension/models/MText"
)

func CreateMany(sourceId string, texts []SGoogle.TCaptionTranscriptTextEntry, language string) ([]MText.Text, error) {
	Content, err := MText.CreateMany(sourceId, texts, language)
	if err != nil {
		return nil, err
	}

	return Content, nil
}
