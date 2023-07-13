package commands

import (
	"fmt"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show Version",
	Long:  "Print current version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Version CMD")
	},
}
