package CUser

import (
	"clipcap/pkg/shared/models/MUser"
)

func FindByEmail(email string) (MUser.TUser, error) {
	User, err := MUser.FindOneByEmail(email)
	if err != nil {
		return MUser.TUser{}, err
	}

	return User, nil
}
