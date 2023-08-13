package SLog

import (
	"log"
	"os"
	"time"

	"github.com/google/uuid"
)

func Init() TLogger {
	var SLog TLogger
	requestId := uuid.New().String()

	ts := time.Now()
	filename := ts.Format("02.01.06_15:04:05")

	SLog.requestId = requestId
	SLog.file, _ = os.Create("./__logs/" + filename + ".md")

	SLog.logger = log.New(SLog.file, "", log.LstdFlags)

	SLog.Log("Request ID: %s. Timestamp: %s", requestId, filename)

	return SLog
}
