package setup

import (
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/controllers/CConfiguration"
	"clipcap/pkg/shared/controllers/CPassword"
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/services/SLog"
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"os"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Do() {
	Logger := SLog.Init()
	Logger.Log("Checking if db is clear...")

	if !CConfiguration.IsNewInstance() {
		Logger.Log("Preparing db...")
		if err := CConfiguration.Initialize(); err != nil {
			panic("Failed to Initialize")
		}

		CActivity.Create([]interface{}{"instance_initialization"}, primitive.NewObjectID(), "Initialized", "")

		DefaultUser := SConfiguration.Configuration.Authentication.DefaultUser

		Logger.Log("Creating default user " + DefaultUser.Email)
		password, err := CPassword.Hash(DefaultUser.Password)
		if err != nil {
			Logger.Log("Error while hashing password. Error: %s", err.Error())
			os.Exit(1)
		}
		User, err := CUser.Create(DefaultUser.Email, password, "Default User", true)
		if err != nil {
			Logger.Log("Error while creating user. Error: %s", err.Error())
			os.Exit(1)
		}
		Logger.Log("User with %s created.", User.Email)

		CActivity.Create([]interface{}{User.ID}, User.ID, "is registered", "")

		return
	}

	Logger.Log("Reading database...")
}
