package api

import (
	"clipcap/web/pkg/api/handlers/Authentication"
	"clipcap/web/pkg/api/handlers/Google"
	"clipcap/web/pkg/api/handlers/Password"
	"clipcap/web/pkg/api/handlers/Summarize"
	"clipcap/web/pkg/api/handlers/Tools"
	"clipcap/web/pkg/api/handlers/Transaction"
	"clipcap/web/pkg/api/handlers/User"
	"clipcap/web/pkg/services/SStatic"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RunRouter() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"*",
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Refresh", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		AllowWebSockets:  false,
		MaxAge:           0,
	}))

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

	router.GET("/api/v1/transaction/:transactionId", Transaction.Get)

	router.GET("/api/v1/healthcheck", Tools.HealthCheck)

	//router.NoRoute(Tools.ProxyNextFrontend)
	router.NoRoute(gin.WrapH(http.FileServer(http.FS(SStatic.Frontend))))

	router.Run(":8080")
}
