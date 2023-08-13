package MSummary

import (
	"context"
	"time"
)

func CreateMany(data []TSummary) ([]TSummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var In []interface{}

	for _, item := range data {
		In = append(In, item)
	}

	if _, err := GetCollection().InsertMany(ctx, In); err != nil {
		return data, err
	}

	return data, nil
}
