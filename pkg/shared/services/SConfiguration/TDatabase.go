package SConfiguration

type TDatabase struct {
	URI  string `mapstructure:"uri"`
	Name string `mapstructure:"name"`
}
