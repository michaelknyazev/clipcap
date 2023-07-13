package types

type Response struct {
	Success bool   `json:"success"`
	Event   string `json:"event"`
	Result  any    `json:"result"`
}
