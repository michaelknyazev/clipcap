package commands

import (
	"clipcap/pkg/shared/database"
	"clipcap/pkg/shared/services/SChatGPT"
	"clipcap/pkg/shared/services/SGoogle"
	"clipcap/pkg/summary-extension/router"
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"clipcap/pkg/summary-extension/setup"

	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start App",
	Long:  "Start the App",
	Run: func(cmd *cobra.Command, args []string) {
		/*
			TODO: Move the config initializing to the init()
		*/
		_configFlag := cmd.Flags().Lookup("config")
		configPath := _configFlag.Value.String()
		if err := SConfiguration.Init(configPath); err != nil {
			panic(err)
		}

		if err := database.Configure(
			SConfiguration.Configuration.Database.URI,
			SConfiguration.Configuration.Database.Name,
		); err != nil {
			panic(err)
		}

		if err := database.Connect(); err != nil {
			panic(err)
		}

		defer func() {
			if err := database.Disconnect(); err != nil {
				panic(err)
			}
		}()

		if err := SGoogle.Init(); err != nil {
			panic(err)
		}

		if err := SChatGPT.Init(); err != nil {
			panic(err)
		}

		setup.Do()
		router.Run()

		// TODO: Init Queue here for Rev.Ai
	},
}
