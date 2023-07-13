// Search retrieves activity data that match a given tag.
//
// This endpoint requires the user to be authenticated with a valid access token.
//
// Query Parameters:
//   - tag: a string to search for in the activity data.
//
// Response Status Codes:
//   - 200: on successful retrieval of activity data.
//   - 401: if the user is not authenticated.
//   - 403: if the 'tag' parameter is missing.
//   - 500: on server error.
//
// Response Payload:
//   - an array of activity data objects matching the given tag.
package Activity

import (
	"clipcap/web/pkg/api/controllers/CAccessToken"
	"clipcap/web/pkg/api/responses"
	"clipcap/web/pkg/controllers/CActivity"

	"github.com/gin-gonic/gin"
)

func Search(c *gin.Context) {
	access_token, err := c.Cookie("access_token")
	if err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	if _, err := CAccessToken.Verify(access_token); err != nil {
		c.JSON(401, responses.AuthenticationUnauthorized())
		c.Abort()
		return
	}

	tag := c.Query("tag")
	if tag == "" {
		c.JSON(403, responses.SystemForbidden())
		c.Abort()
		return
	}

	Activity, err := CActivity.Search(tag)
	if err != nil {
		c.JSON(500, responses.SystemServerError())
		c.Abort()
		return
	}

	c.JSON(200, responses.SystemServerSuccessWithData(Activity))
	c.Abort()
}
