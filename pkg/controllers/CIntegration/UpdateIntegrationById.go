package CIntegration

import (
	"clipcap/web/pkg/models/MIntegration"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateIntegrationById(integrationId primitive.ObjectID, update MIntegration.Integration) (MIntegration.Integration, error) {
	update.Updated = time.Now().Unix()

	Integration, err := MIntegration.ReplaceById(integrationId, update)
	if err != nil {
		return Integration, err
	}

	return Integration, nil
}
