package CChunk

import (
	"clipcap/pkg/summary-extension/models/MChunk"
	"clipcap/pkg/summary-extension/models/MText"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ConvertSource(language string, sourceID primitive.ObjectID, SourceContent []MText.TText) []MChunk.TChunk {
	var Content []string

	var totalLengthInSeconds float64
	var chunkLengthInSeconds float64
	var totalSize int
	var currentSize int
	var currentText []string
	var currentTimeStamp float64
	var currentChunkDurationInSeconds float64
	var currentChunkIndex int = 0
	var startStamp float64
	var ChunksCount float64 = 6

	for _, item := range SourceContent {
		totalSize += len(item.Content)
		itemDuration := item.Duration / 2
		totalLengthInSeconds += itemDuration

		Content = append(Content, item.Content)
	}

	chunkLengthInSeconds = totalLengthInSeconds / ChunksCount

	if totalLengthInSeconds >= 3600 {
		chunkLengthInSeconds = 600 // 10 mins
		ChunksCount = totalLengthInSeconds / chunkLengthInSeconds
	}

	if totalLengthInSeconds >= 5400 {
		chunkLengthInSeconds = 900 // 15mins
		ChunksCount = totalLengthInSeconds / chunkLengthInSeconds
	}

	if totalLengthInSeconds >= 7200 {
		chunkLengthInSeconds = 1200 // 20mins
		ChunksCount = totalLengthInSeconds / chunkLengthInSeconds
	}

	var chunks []MChunk.TChunk

	totalSourceTextCount := len(SourceContent) - 1
	ts := time.Now()

	for i, text := range SourceContent {
		textDuration := text.Duration / 2

		currentSize += len(text.Content)
		currentChunkDurationInSeconds += textDuration
		currentTimeStamp += textDuration
		currentText = append(currentText, text.Content)

		isLastText := i >= totalSourceTextCount

		if currentChunkDurationInSeconds >= chunkLengthInSeconds || isLastText {
			chunks = append(chunks, MChunk.TChunk{
				ID:              primitive.NewObjectID(),
				Size:            currentSize,
				Start:           startStamp,
				End:             startStamp + text.Duration,
				OriginalContent: strings.Join(currentText, " "),
				Language:        language,
				SourceID:        sourceID,
				Created:         ts.Unix(),
				Updated:         ts.Unix(),
			})

			currentSize = 0
			currentChunkDurationInSeconds = 0
			currentText = []string{}
			startStamp = currentTimeStamp
			currentChunkIndex += 1
		}
	}

	return chunks
}
