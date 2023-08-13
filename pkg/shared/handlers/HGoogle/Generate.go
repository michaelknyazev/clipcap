package HGoogle

import (
	"clipcap/pkg/shared/controllers/CGoogle"
	"clipcap/pkg/shared/controllers/CTransaction"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func Generate(c *gin.Context) {
	//Logger := SLog.Init()
	seed := uuid.New()
	url, err := CGoogle.GenerateLink(seed.String())
	if err != nil {
		c.JSON(500, types.TResponse{false, "GOOGLE_LINK_FAILED", nil})
		c.Abort()
		return
	}

	Transaction, err := CTransaction.Create(seed.String())
	if err != nil {
		c.JSON(500, types.TResponse{false, "TRANSACTION_CREATE_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", map[string]interface{}{
		"url":           url,
		"transactionId": Transaction.ID,
	}})
	c.Abort()
	return
}
