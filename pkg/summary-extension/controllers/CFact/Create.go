package CFact

import (
	"clipcap/pkg/summary-extension/models/MFact"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(userId primitive.ObjectID, sourceId primitive.ObjectID) (MFact.Fact, error) {
	ts := time.Now()
	Fact := MFact.Fact{
		ID:       primitive.NewObjectID(),
		SourceID: sourceId,
		UserID:   userId,
		Created:  ts.Unix(),
		Updated:  ts.Unix(),
	}

	_, err := MFact.Create(Fact)
	if err != nil {
		return MFact.Fact{}, err
	}

	return Fact, nil
}
