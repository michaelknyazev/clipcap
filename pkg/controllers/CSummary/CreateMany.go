package CSummary

import (
	"clipcap/web/pkg/controllers/CGPT"
	"clipcap/web/pkg/models/MSummary"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMany(sourceId string, summaries []CGPT.TSummary) ([]MSummary.Summary, error) {
	ts := time.Now()

	var Data []MSummary.Summary

	for _, item := range summaries {
		Data = append(Data, MSummary.Summary{
			ID:       primitive.NewObjectID(),
			SourceID: sourceId,
			Start:    item.Start,
			End:      item.End,
			Emoji:    item.Emoji,
			Content:  item.Content,
			Title:    item.Title,
			Created:  ts.Unix(),
			Updated:  ts.Unix(),
		})
	}

	Content, err := MSummary.CreateMany(sourceId, Data)
	if err != nil {
		return nil, err
	}

	return Content, nil
}
