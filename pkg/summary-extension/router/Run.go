package router

import (
	"clipcap/pkg/shared/handlers/HAuthentication"
	"clipcap/pkg/shared/handlers/HGoogle"
	"clipcap/pkg/shared/handlers/HPassword"
	"clipcap/pkg/shared/handlers/HTools"
	"clipcap/pkg/shared/handlers/HTransaction"
	"clipcap/pkg/shared/handlers/HUser"
	"clipcap/pkg/summary-extension/handlers/HFacts"
	"clipcap/pkg/summary-extension/handlers/HSummarize"
	"clipcap/pkg/summary-extension/services/SStatic"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Run() {
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

	router.POST("/api/v1/auth/email", HAuthentication.CheckEmail)
	router.POST("/api/v1/auth/login", HAuthentication.LogIn)

	router.POST("/api/v1/auth/refresh", HAuthentication.Refresh)
	router.POST("/api/v1/auth/logout", HAuthentication.LogOut)

	router.POST("/api/v1/auth/restore", HPassword.Restore)
	router.POST("/api/v1/auth/reset", HPassword.Reset)

	router.POST("/api/v1/auth/google/generate", HGoogle.Generate)
	router.GET("/api/v1/auth/google/callback", HGoogle.Callback)

	router.GET("/api/v1/summarize/youtube", HSummarize.Youtube)

	router.GET("/api/v1/user", HUser.Identify)
	router.GET("/api/v1/facts", HFacts.GetCurrent)

	router.GET("/api/v1/transaction/:transactionId", HTransaction.Get)

	router.GET("/api/v1/healthcheck", HTools.HealthCheck)

	//router.NoRoute(Tools.ProxyNextFrontend)
	router.NoRoute(gin.WrapH(http.FileServer(http.FS(SStatic.Frontend))))

	router.Run(":8080")
}
