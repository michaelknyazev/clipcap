package SConfiguration

import (
	"os"

	"github.com/spf13/viper"
)

var Configuration TConfiguration

func Init(configPath string) error {
	viper.SetConfigType("yaml")
	viper.SetConfigFile(configPath)
	viper.ReadInConfig()

	if err := viper.Unmarshal(&Configuration); err != nil {
		return err
	}

	isDevelopment := os.Getenv("MODE") == "development"
	Configuration.IsProduction = !isDevelopment

	return nil
}
