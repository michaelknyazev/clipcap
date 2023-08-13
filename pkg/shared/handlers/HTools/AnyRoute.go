package HTools

import (
	"github.com/gin-gonic/gin"
)

func AnyRoute(c *gin.Context) {
	//Logger := SLog.Init()
	c.JSON(403, map[string]interface{}{
		"result": "Forbidden",
	})
	c.Abort()
}
