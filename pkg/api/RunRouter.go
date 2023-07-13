package api

import (
	"clipcap/web/pkg/api/handlers/Authentication"
	"clipcap/web/pkg/api/handlers/Google"
	"clipcap/web/pkg/api/handlers/Password"
	"clipcap/web/pkg/api/handlers/Summarize"
	"clipcap/web/pkg/api/handlers/Tools"
	"clipcap/web/pkg/api/handlers/User"

	"github.com/gin-gonic/gin"
)

func RunRouter() {
	router := gin.Default()
	router.MaxMultipartMemory = 128 << 20 // 128 * (2^20) = 128MB

	router.POST("/api/v1/auth/email", Authentication.CheckEmail)
	router.POST("/api/v1/auth/login", Authentication.LogIn)

	router.POST("/api/v1/auth/refresh", Authentication.Refresh)
	router.POST("/api/v1/auth/logout", Authentication.LogOut)

	router.POST("/api/v1/auth/restore", Password.Restore)
	router.POST("/api/v1/auth/reset", Password.Reset)

	router.POST("/api/v1/auth/google/generate", Google.Generate)
	router.GET("/api/v1/auth/google/callback", Google.Callback)

	router.GET("/api/v1/summarize/youtube", Summarize.Youtube)

	router.GET("/api/v1/user", User.Identify)

	router.GET("/api/v1/healthcheck", Tools.HealthCheck)

	//router.NoRoute(Tools.ProxyNextFrontend)

	router.Run(":8080")
}