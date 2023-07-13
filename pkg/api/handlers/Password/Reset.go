package Password

import "github.com/gin-gonic/gin"

func Reset(c *gin.Context) {
	c.JSON(200, map[string]interface{}{
		"result": "Reset Password",
	})
	c.Abort()
}
