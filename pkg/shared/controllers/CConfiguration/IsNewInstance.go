package CConfiguration

import (
	"clipcap/pkg/shared/models/MConfiguration"
)

func IsNewInstance() bool {
	Configuration, err := MConfiguration.FindOneByVariableName("initialized")
	if err != nil {
		return false
	}

	return Configuration.Value == true
}
