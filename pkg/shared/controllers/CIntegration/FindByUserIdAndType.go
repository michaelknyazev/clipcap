package CIntegration

import (
	"clipcap/pkg/shared/models/MIntegration"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FindByUserIdAndType(userId primitive.ObjectID, integrationType string) (MIntegration.TIntegration, error) {
	Integration, err := MIntegration.FindOneByUserIdAndType(userId, integrationType)
	if err != nil {
		return MIntegration.TIntegration{}, err
	}

	return Integration, nil
}
