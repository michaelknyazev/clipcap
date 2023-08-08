package SConfiguration

import "clipcap/pkg/shared/services/SConfiguration"

type TConfiguration struct {
	IsProduction   bool
	Host           string                         `mapstructure:"host"`
	Database       SConfiguration.TDatabase       `mapstructure:"database"`
	Authentication SConfiguration.TAuthentication `mapstructure:"authentication"`
	Security       SConfiguration.TSecurity       `mapstructure:"security"`
	Integrations   TIntegrations                  `mapstructure:"integrations"`
	Miscellaneous  TMiscellaneous                 `mapstructure:"miscellaneous"`
}
