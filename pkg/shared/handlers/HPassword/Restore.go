package HPassword

import (
	"github.com/gin-gonic/gin"
)

func Restore(c *gin.Context) {
	//Logger := SLog.Init()
	c.JSON(200, map[string]interface{}{
		"result": "Restore password",
	})
	c.Abort()
}
