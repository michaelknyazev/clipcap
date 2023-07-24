package types

type TResponse struct {
	Success bool   `json:"success"`
	Event   string `json:"event"`
	Result  any    `json:"result"`
}
