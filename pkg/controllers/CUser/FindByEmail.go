package CUser

import (
	"clipcap/web/pkg/models/MUser"
)

func FindByEmail(email string) (MUser.User, error) {
	User, err := MUser.FindOneByEmail(email)
	if err != nil {
		return MUser.User{}, err
	}

	return User, nil
}
