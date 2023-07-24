package CText

import (
	"clipcap/pkg/summary-extension/models/MText"
)

func FindBySourceId(sourceId string) ([]MText.Text, error) {
	Content, err := MText.FindBySourceId(sourceId)
	if err != nil {
		return []MText.Text{}, err
	}

	return Content, nil
}
