package SLog

import (
	"clipcap/pkg/summary-extension/services/SConfiguration"
	"fmt"
	"time"
)

func (instance *TLogger) Log(format string, args ...interface{}) {
	isProduction := SConfiguration.Configuration.IsProduction
	ts := time.Now()
	formatted := ts.Format(time.Stamp)

	str := fmt.Sprintf(format, args...)
	log := fmt.Sprintf("[debug] %s %s", formatted, str)

	instance.logger.Println(log)

	if !isProduction {
		fmt.Println(log)
	}
}
