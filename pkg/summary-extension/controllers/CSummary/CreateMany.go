package CSummary

import (
	"clipcap/pkg/summary-extension/models/MSummary"
)

func CreateMany(data []MSummary.TSummary) ([]MSummary.TSummary, error) {
	Content, err := MSummary.CreateMany(data)
	if err != nil {
		return nil, err
	}

	return Content, nil
}
