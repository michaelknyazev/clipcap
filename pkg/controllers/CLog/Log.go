package CLog

import (
	"fmt"
	"time"
)

func Log(args ...interface{}) {
	ts := time.Now()
	formatted := ts.Format(time.Stamp)

	fmt.Printf("[debug] %s %s \n", formatted, args)
}
