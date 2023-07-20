package Transaction

import (
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CTransaction"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Get(c *gin.Context) {
	transactionId := c.Param("transactionId")
	if transactionId == "" {
		c.JSON(404, responses.SystemNotFound())
		c.Abort()
		return
	}

	transactionObjId, err := primitive.ObjectIDFromHex(transactionId)
	if err != nil {
		c.JSON(404, responses.SystemNotFound())
		c.Abort()
		return
	}

	Transaction, err := CTransaction.FindById(transactionObjId)
	if err != nil {
		c.JSON(404, responses.SystemNotFound())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccessWithData(map[string]interface{}{
		"transactionId": Transaction.ID,
		"created":       Transaction.Created,
		"updated":       Transaction.Updated,
		"data":          Transaction.Data,
		"processed":     Transaction.Processed,
		"status":        Transaction.Status,
	}))
	c.Abort()
	return
}
