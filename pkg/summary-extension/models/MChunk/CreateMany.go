package MChunk

import (
	"context"
	"time"
)

func CreateMany(chunks []TChunk) ([]TChunk, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var In []interface{}

	for _, item := range chunks {
		In = append(In, item)
	}

	if _, err := GetCollection().InsertMany(ctx, In); err != nil {
		return []TChunk{}, err
	}

	return chunks, nil
}
