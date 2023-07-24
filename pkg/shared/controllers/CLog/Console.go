package CLog

import (
	"fmt"
	"time"
)

func Console(message interface{}) {
	ts := time.Now()
	formatted := ts.Format(time.Stamp)

	fmt.Println("[debug] ", formatted, message)
}
