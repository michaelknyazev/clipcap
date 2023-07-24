package CGPT

import (
	"clipcap/pkg/summary-extension/models/MText"
)

type TChunk struct {
	Size    int
	Start   float64
	End     float64
	Content []string
}

const SplitTimeFrameInSeconds = 6 * 60

func PrepareTextFromSource(SourceContent []MText.Text) []TChunk {
	var Content []string

	var totalLengthInSeconds float64
	var chunkLengthInSeconds float64
	var totalSize int
	var currentSize int
	var currentText []string
	var currentTimeStamp float64
	var startStamp float64
	var ChunksCount float64 = 6

	for _, item := range SourceContent {
		totalSize += len(item.Content)
		totalLengthInSeconds += item.Duration

		Content = append(Content, item.Content)
	}

	chunkLengthInSeconds = totalLengthInSeconds / ChunksCount

	if totalLengthInSeconds >= 3600 {
		chunkLengthInSeconds = 900 // 15 mins
		ChunksCount = totalLengthInSeconds / chunkLengthInSeconds
	}

	/*
		if totalLengthInSeconds <= SplitTimeFrameInSeconds {
			return []TChunk{
				{
					Size:    totalSize,
					Start:   0,
					End:     totalLengthInSeconds,
					Content: Content,
				},
			}
		}*/

	var chunks []TChunk

	for _, text := range SourceContent {
		currentSize += len(text.Content)
		currentTimeStamp += text.Duration
		currentText = append(currentText, text.Content)

		if currentTimeStamp >= chunkLengthInSeconds {
			chunks = append(chunks, TChunk{
				Size:    currentSize,
				Start:   startStamp,
				End:     currentTimeStamp,
				Content: currentText,
			})

			currentSize = 0
			currentTimeStamp = 0
			currentText = []string{}
			startStamp = text.Start + text.Duration
		}
	}

	return chunks
}
