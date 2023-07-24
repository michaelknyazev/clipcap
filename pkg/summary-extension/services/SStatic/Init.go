package SStatic

import (
	"embed"
	"io/fs"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

var Frontend fs.FS

func Init(directory embed.FS, path string) {
	sub, err := fs.Sub(directory, path)
	if err != nil {
		panic(err)
	}

	Frontend = sub
}

func ServeAuthPage(c *gin.Context) {
	fileToServe, err := http.FS(Frontend).Open("auth/index.html")
	if err != nil {
		panic(err)
	}

	ts := time.Now()

	http.ServeContent(c.Writer, c.Request, "index.html", ts, fileToServe)
}

func Serve404Page(c *gin.Context) {
	fileToServe, err := http.FS(Frontend).Open("404/index.html")
	if err != nil {
		panic(err)
	}

	ts := time.Now()

	http.ServeContent(c.Writer, c.Request, "index.html", ts, fileToServe)
}
