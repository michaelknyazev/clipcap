package setup

import (
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CConfiguration"
	"clipcap/pkg/shared/controllers/CLog"
	"clipcap/pkg/shared/controllers/CPassword"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/summary-extension/services/SConfiguration"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Do() {
	CLog.Console("Checking if db is clear...")

	if !CConfiguration.IsNewInstance() {
		CLog.Console("Preparing db...")
		if err := CConfiguration.Initialize(); err != nil {
			panic("Failed to Initialize")
		}

		CActivity.Create([]interface{}{"instance_initialization"}, primitive.NewObjectID(), "Initialized", "")

		DefaultUser := SConfiguration.Configuration.Authentication.DefaultUser

		CLog.Console("Creating default user " + DefaultUser.Email)
		password, err := CPassword.Hash(DefaultUser.Password)
		if err != nil {
			CLog.Exit(err)
		}
		User, err := CUser.Create(DefaultUser.Email, password, "Default User", true)
		if err != nil {
			CLog.Exit(err)
		}
		CLog.Console("User " + User.Email + " created.")

		CActivity.Create([]interface{}{User.ID}, User.ID, "is registered", "")

		return
	}

	CLog.Console("Reading database...")
}
