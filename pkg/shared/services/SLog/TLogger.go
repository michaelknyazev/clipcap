package SLog

import (
	"log"
	"os"
)

type TLogger struct {
	file      *os.File
	logger    *log.Logger
	requestId string
}
