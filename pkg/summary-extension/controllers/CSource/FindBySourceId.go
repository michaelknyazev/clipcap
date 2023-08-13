package CSource

import (
	"clipcap/pkg/summary-extension/models/MSource"
)

func FindOneBySourceId(sourceId string) (MSource.TSource, error) {
	Source, err := MSource.FindOneBySourceId(sourceId)
	if err != nil {
		return MSource.TSource{}, err
	}

	return Source, nil
}
