package SConfiguration

import "github.com/spf13/viper"

var Configuration TConfiguration

func Init(configPath string) error {
	viper.SetConfigType("yaml")
	viper.SetConfigFile(configPath)
	viper.ReadInConfig()

	return viper.Unmarshal(&Configuration)
}
