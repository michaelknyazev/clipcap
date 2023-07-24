package CLog

import "os"

func Exit(message error) {
	Console(message.Error())
	os.Exit(0)
}
