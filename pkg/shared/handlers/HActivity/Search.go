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
package HActivity

import (
	"clipcap/pkg/shared/controllers/CAccessToken"
	"clipcap/pkg/shared/controllers/CActivity"
	"clipcap/pkg/shared/types"

	"github.com/gin-gonic/gin"
)

func Search(c *gin.Context) {
	// Logger := SLog.Init()
	access_token, err := c.Cookie("access_token")
	if err != nil {
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	if _, err := CAccessToken.Verify(access_token); err != nil {
		c.JSON(401, types.TResponse{false, "ACCESS_TOKEN_INVALID", nil})
		c.Abort()
		return
	}

	tag := c.Query("tag")
	if tag == "" {
		c.JSON(403, types.TResponse{false, "QUERY_PARAM_EMPTY", nil})
		c.Abort()
		return
	}

	Activity, err := CActivity.Search(tag)
	if err != nil {
		c.JSON(500, types.TResponse{false, "ACTIVITY_SEARCH_FAILED", nil})
		c.Abort()
		return
	}

	c.JSON(200, types.TResponse{true, "SUCCESS", Activity})
	c.Abort()
}
