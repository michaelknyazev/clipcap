package Google

import (
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CGoogle"
	"clipcap/web/pkg/controllers/CTransaction"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func Generate(c *gin.Context) {
	seed := uuid.New()
	url, err := CGoogle.GenerateLink(seed.String())
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	Transaction, err := CTransaction.Create(seed.String())
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccessWithData(map[string]interface{}{
		"url":           url,
		"transactionId": Transaction.ID,
	}))
	c.Abort()
	return
}
