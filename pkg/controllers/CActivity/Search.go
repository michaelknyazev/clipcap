package CActivity

import (
	"clipcap/web/pkg/models/MActivity"
)

func Search(tag string) ([]MActivity.ActivityWithUser, error) {
	Activity, err := MActivity.SearchByTag(tag)
	if err != nil {
		return []MActivity.ActivityWithUser{}, err
	}

	return Activity, nil
}