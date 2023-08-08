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

func PrepareTextFromSource(SourceContent []MText.Text) []TChunk {
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
		// fmt.Printf("Current length: %f, Added duration: %f, Source Content: %s\n", totalLengthInSeconds, item.Duration, item.Content)

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

	var chunks []TChunk

	// fmt.Println("Chunk length:", chunkLengthInSeconds)
	// fmt.Println("Chunk count:", ChunksCount)
	// fmt.Println("Total length in seconds", totalLengthInSeconds)

	// fmt.Printf("---- 0 CHUNK STARTED ----\n")

	totalSourceTextCount := len(SourceContent) - 1

	for i, text := range SourceContent {
		textDuration := text.Duration / 2

		// fmt.Printf("#%d Current size: %d, Current Timestamp: %f, Added Duration: %f\n", i, currentSize, currentTimeStamp, textDuration)

		currentSize += len(text.Content)
		currentChunkDurationInSeconds += textDuration
		currentTimeStamp += textDuration
		currentText = append(currentText, text.Content)

		isLastText := i >= totalSourceTextCount

		if currentChunkDurationInSeconds >= chunkLengthInSeconds || isLastText {
			chunks = append(chunks, TChunk{
				Size:    currentSize,
				Start:   startStamp,
				End:     startStamp + text.Duration,
				Content: currentText,
			})
			// fmt.Printf("Chunk Start stamp: %f, Chunk duration in seconds: %f, Chunk end stamp: %f\n", startStamp, currentChunkDurationInSeconds, currentTimeStamp)
			// fmt.Printf("---- %d CHUNK FINISHED ----\n", currentChunkIndex)

			currentSize = 0
			currentChunkDurationInSeconds = 0
			currentText = []string{}
			startStamp = currentTimeStamp
			currentChunkIndex += 1

			// if !isLastText {
			// 	fmt.Printf("---- %d CHUNK STARTED ----\n", currentChunkIndex)
			// 	fmt.Printf("Chunk start stamp: %f, Current stamp: %f\n", startStamp, currentTimeStamp)
			// }
		}
	}

	// fmt.Println(len(chunks))

	return chunks
}
