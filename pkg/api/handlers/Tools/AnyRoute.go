package Tools

import "github.com/gin-gonic/gin"

func AnyRoute(c *gin.Context) {
	c.JSON(403, map[string]interface{}{
		"result": "Forbidden",
	})
	c.Abort()
}
