package CSource

import (
	"clipcap/web/pkg/models/MSource"
)

func FindOneBySourceId(sourceId string) (MSource.Source, error) {
	Source, err := MSource.FindOneBySourceId(sourceId)
	if err != nil {
		return MSource.Source{}, err
	}

	return Source, nil
}
