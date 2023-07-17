package CGPT

import (
	"clipcap/web/pkg/services/SChatGPT"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
)

type TSummary struct {
	Emoji   string
	Title   string
	Content string
	Start   float64
	End     float64
}

type TSummaryError struct {
	Chunk   TChunk
	Message string
}

func SummarizeFromChunks(chunks []TChunk) ([]TSummary, error) {
	var wg sync.WaitGroup
	var errs []TSummaryError

	result := make([]TSummary, len(chunks))

	for i, chunk := range chunks {
		wg.Add(1)

		go func(i int, item TChunk) {
			defer wg.Done()

			chatForTitle, err := SChatGPT.CreateChat("Create a short title for this text, no conversation, just write a title. Title must be in English.", strings.Join(item.Content, ""))
			if err != nil || len(chatForTitle.Choices) == 0 {
				fmt.Println(err)

				d, _ := json.Marshal(chatForTitle)
				fmt.Println(string(d))

				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't create chat for title",
				})
				return
			}

			chatForEmoji, err := SChatGPT.CreateChat("Give an emoji describing this text, no conversation, just respond with an emoji.", strings.Join(item.Content, ""))
			if err != nil || len(chatForEmoji.Choices) == 0 {
				fmt.Println(err)

				d, _ := json.Marshal(chatForTitle)
				fmt.Println(string(d))
				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't create chat for emoji",
				})
				return
			}

			chatForDescription, err := SChatGPT.CreateChat("Create a short summary for this text. No conversation, just respond with summary.", strings.Join(item.Content, ""))
			if err != nil || len(chatForDescription.Choices) == 0 {
				fmt.Println(err)

				d, _ := json.Marshal(chatForTitle)
				fmt.Println(string(d))
				errs = append(errs, TSummaryError{
					Chunk:   item,
					Message: "Can't create chat for description",
				})
				return
			}

			result[i] = TSummary{
				Start:   item.Start,
				End:     item.End,
				Title:   chatForTitle.Choices[0].Message.Content,
				Emoji:   chatForEmoji.Choices[0].Message.Content,
				Content: chatForDescription.Choices[0].Message.Content,
			}
		}(i, chunk)
	}

	wg.Wait()

	if len(errs) != 0 {
		return result, errors.New("errors while summarizing some chunks")
	}

	return result, nil
}
