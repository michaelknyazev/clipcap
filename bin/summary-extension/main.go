package main

import (
	"clipcap/pkg/summary-extension/commands"
	"clipcap/pkg/summary-extension/services/SStatic"
	"embed"
)

//go:embed all:dist/exported
var frontendExportedFiles embed.FS

// Relative path to exported frontend files
var frontendSubDirectoryPath string = "dist/exported"

func main() {
	SStatic.Init(frontendExportedFiles, frontendSubDirectoryPath)
	commands.Execute()
}
