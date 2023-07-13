package Tools

import "github.com/gin-gonic/gin"

func HealthCheck(c *gin.Context) {
	c.JSON(200, map[string]interface{}{
		"result": "All good",
	})
	c.Abort()
}
