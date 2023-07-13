package CIntegration

import (
	"clipcap/web/pkg/models/MIntegration"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindByUserIdAndType(userId primitive.ObjectID, integrationType string) (MIntegration.Integration, error) {
	Integration, err := MIntegration.FindOneByUserIdAndType(userId, integrationType)
	if err != nil {
		return MIntegration.Integration{}, err
	}

	return Integration, nil
}
