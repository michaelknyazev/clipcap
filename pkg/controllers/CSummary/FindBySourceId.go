package CSummary

import (
	"clipcap/web/pkg/models/MSummary"
)

func FindBySourceId(sourceId string) ([]MSummary.Summary, error) {
	Content, err := MSummary.FindBySourceId(sourceId)
	if err != nil {
		return []MSummary.Summary{}, err
	}

	return Content, nil
}
