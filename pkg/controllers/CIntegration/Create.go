package CIntegration

import (
	"clipcap/web/pkg/models/MIntegration"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(integrationType string, refresh_token string, access_token string, expiry int64, userId primitive.ObjectID) (MIntegration.Integration, error) {
	ts := time.Now()

	Integration := MIntegration.Integration{
		ID:           primitive.NewObjectID(),
		UserID:       userId,
		RefreshToken: refresh_token,
		AccessToken:  access_token,
		Type:         integrationType,
		Expiry:       expiry,
		Created:      ts.Unix(),
		Updated:      ts.Unix(),
	}

	_, err := MIntegration.Create(Integration)
	if err != nil {
		return MIntegration.Integration{}, err
	}

	return Integration, nil
}
