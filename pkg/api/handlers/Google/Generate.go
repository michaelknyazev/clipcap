package Google

import (
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CGoogle"

	"github.com/gin-gonic/gin"
)

func Generate(c *gin.Context) {
	url, err := CGoogle.GenerateLink()
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccessWithData(url))
	c.Abort()
	return
}
