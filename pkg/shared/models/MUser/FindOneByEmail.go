package MUser

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func FindOneByEmail(email string) (User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result := GetCollection().FindOne(ctx, bson.M{"email": email})
	var User User

	if err := result.Decode(&User); err != nil {
		return User, err
	}

	return User, nil
}
