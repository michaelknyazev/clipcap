package Password

import "github.com/gin-gonic/gin"

func Restore(c *gin.Context) {
	c.JSON(200, map[string]interface{}{
		"result": "Restore password",
	})
	c.Abort()
}
