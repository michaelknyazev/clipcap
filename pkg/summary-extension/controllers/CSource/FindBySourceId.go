package CSource

import (
	"clipcap/pkg/summary-extension/models/MSource"
)

func FindOneBySourceId(sourceId string) (MSource.Source, error) {
	Source, err := MSource.FindOneBySourceId(sourceId)
	if err != nil {
		return MSource.Source{}, err
	}

	return Source, nil
}
