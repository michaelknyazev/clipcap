package SStatic

import (
	"embed"
	"io/fs"
)

var Icons fs.FS

func Init(iconsFS embed.FS) {
	sub, err := fs.Sub(iconsFS, "__assets/lotro-icons/items")
	if err != nil {
		panic(err)
	}

	Icons = sub
}
