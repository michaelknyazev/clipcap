// CheckEmail checks if a user exists with the given email address.
// It expects a JSON payload with an "email" field.
// If the email field is missing or invalid, it returns a 401 error.
// If the user does not exist, it returns a 404 error.
// If the user exists, it returns a 200 success response.
package Authentication

import (
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CUser"

	"github.com/gin-gonic/gin"
)

func CheckEmail(c *gin.Context) {
	var credentials struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(401, responses.AuthenticationMissingCredentials())
		c.Abort()
		return
	}

	_, err := CUser.FindByEmail(credentials.Email)
	if err != nil {
		c.JSON(404, responses.AuthenticationUserDoesNotExist())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccess())
	c.Abort()
}
