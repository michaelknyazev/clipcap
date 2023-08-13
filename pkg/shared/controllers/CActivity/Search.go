package CActivity

import (
	"clipcap/pkg/shared/models/MActivity"
)

func Search(tag string) ([]MActivity.TActivityWithUser, error) {
	Activity, err := MActivity.SearchByTag(tag)
	if err != nil {
		return []MActivity.TActivityWithUser{}, err
	}

	return Activity, nil
}
