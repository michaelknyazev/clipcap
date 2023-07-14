package CText

import (
	"clipcap/web/pkg/models/MText"
	"clipcap/web/pkg/services/SGoogle"
)

func CreateMany(sourceId string, texts []SGoogle.TCaptionTranscriptTextEntry, language string) ([]MText.Text, error) {
	Content, err := MText.CreateMany(sourceId, texts, language)
	if err != nil {
		return nil, err
	}

	return Content, nil
}
