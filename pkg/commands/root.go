package commands

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var ConfigPath string

var rootCmd = &cobra.Command{
	Use:   "runapp",
	Short: "",
	Long:  "",
}

func init() {
	rootCmd.PersistentFlags().StringVarP(&ConfigPath, "config", "c", "", "Specify the config path (Required)")
	rootCmd.MarkFlagRequired("config")
	rootCmd.AddCommand(serveCmd)
	rootCmd.AddCommand(versionCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
