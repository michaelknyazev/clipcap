package HTransaction

import (
	"clipcap/pkg/shared/controllers/CTransaction"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Get(c *gin.Context) {
	// Logger := SLog.Init()
	transactionId := c.Param("transactionId")
	if transactionId == "" {
		c.JSON(404, types.TResponse{false, "QUERY_PARAM_EMPTY", nil})
		c.Abort()
		return
	}

	transactionObjId, err := primitive.ObjectIDFromHex(transactionId)
	if err != nil {
		c.JSON(404, types.TResponse{false, "TRANSACTION_WRONG_ID", nil})
		c.Abort()
		return
	}

	Transaction, err := CTransaction.FindById(transactionObjId)
	if err != nil {
		c.JSON(404, types.TResponse{false, "TRANSACTION_FIND_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", map[string]interface{}{
		"transactionId": Transaction.ID,
		"created":       Transaction.Created,
		"updated":       Transaction.Updated,
		"data":          Transaction.Data,
		"processed":     Transaction.Processed,
		"status":        Transaction.Status,
	}})
	c.Abort()
	return
}
