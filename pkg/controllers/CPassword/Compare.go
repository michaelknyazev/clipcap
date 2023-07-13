package CPassword

import "golang.org/x/crypto/bcrypt"

func Compare(password string, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err
}
