package CIntegration

import (
	"clipcap/pkg/shared/models/MIntegration"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateIntegrationById(integrationId primitive.ObjectID, update MIntegration.TIntegration) (MIntegration.TIntegration, error) {
	update.Updated = time.Now().Unix()

	Integration, err := MIntegration.ReplaceById(integrationId, update)
	if err != nil {
		return Integration, err
	}

	return Integration, nil
}
