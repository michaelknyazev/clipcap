package main

import (
	"clipcap/web/pkg/commands"
	"clipcap/web/pkg/services/SStatic"
	"embed"
)

//go:embed all:dist/public/extension-frontend/exported
var frontendExportedFiles embed.FS

// Relative path to exported frontend files
var frontendSubDirectoryPath string = "dist/public/extension-frontend/exported"

func main() {
	SStatic.Init(frontendExportedFiles, frontendSubDirectoryPath)
	commands.Execute()
}
