package responses

import "clipcap/web/pkg/api/types"

func SystemServerSuccess() types.Response {
	return types.Response{
		Success: true,
		Event:   "SYSTEM_SERVER_SUCCESS",
	}
}

func SystemServerSuccessWithData(data interface{}) types.Response {
	return types.Response{
		Success: true,
		Event:   "SYSTEM_SERVER_SUCCESS",
		Result:  data,
	}
}

func SystemServerError() types.Response {
	return types.Response{
		Success: true,
		Event:   "SYSTEM_SERVER_ERROR",
	}
}

func SystemNotFound() types.Response {
	return types.Response{
		Success: false,
		Event:   "NOT_FOUND",
	}
}

func SystemForbidden() types.Response {
	return types.Response{
		Success: false,
		Event:   "FORBIDDEN",
	}
}
