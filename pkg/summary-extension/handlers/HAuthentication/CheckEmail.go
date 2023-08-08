// CheckEmail checks if a user exists with the given email address.
// It expects a JSON payload with an "email" field.
// If the email field is missing or invalid, it returns a 401 error.
// If the user does not exist, it returns a 404 error.
// If the user exists, it returns a 200 success response.
package HAuthentication

import (
	"clipcap/pkg/shared/controllers/CUser"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func CheckEmail(c *gin.Context) {
	var credentials struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(401, types.TResponse{false, "REQ_BODY_EMPTY", nil})
		c.Abort()
		return
	}

	_, err := CUser.FindByEmail(credentials.Email)
	if err != nil {
		c.JSON(404, types.TResponse{false, "USER_FIND_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", nil})
	c.Abort()
}
