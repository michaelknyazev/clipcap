package responses

import (
	"clipcap/web/pkg/api/types"
	"clipcap/web/pkg/models/MUser"
)

/*
	TODO: Figure how to store all of that in constants
*/

func AuthenticationNoAuthorization() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_NOAUTHORIZATION",
		Result:  "Unauthorized",
	}
}

func AuthenticationWrongAuthorization() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_WRONGAUTHORIZATION",
		Result:  "Unauthorized",
	}
}

func AuthenticationUnauthorized() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_UNAUTHORIZED",
		Result:  "Unauthorized",
	}
}

func AuthenticationFailedToCreateAuthorization() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_CREATEAUTHORIZATION_FAILED",
		Result:  "Failed to create authorization",
	}
}

func AuthenticationGenerateAccessTokenFailed(message string) types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_GENERATEACCESSTOKEN_FAILED",
		Result: map[string]interface{}{
			"message": message,
		},
	}
}

func AuthenticationGenerateRefreshTokenFailed(message string) types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_GENERATEREFRESHTOKEN_FAILED",
		Result: map[string]interface{}{
			"message": message,
		},
	}
}

func AuthenticationParseAccessTokenFailed(message string) types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_PARSEACCESSTOKEN_FAILED",
		Result: map[string]interface{}{
			"message": message,
		},
	}
}

func AuthenticationParseRefreshTokenFailed(message string) types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_PARSEREFRESHTOKEN_FAILED",
		Result: map[string]interface{}{
			"message": message,
		},
	}
}

func AuthenticationFailedToRemoveAuthorization(message string) types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_REMOVEAUTHORIZATION_FAILED",
		Result: map[string]interface{}{
			"message": message,
		},
	}
}

func AuthenticationMissingCredentials() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_MISSING_CREDENTIALS",
		Result:  "Missing credentials",
	}
}

func AuthenticationUserDoesNotExist() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_USER_NOTEXIST",
		Result:  "User does not exist",
	}
}

func AuthenticationWrongPassword() types.Response {
	return types.Response{
		Success: false,
		Event:   "AUTHENTICATION_WRONG_PASSWORD",
		Result:  "Wrong password",
	}
}

// TBD
func AuthenticationUserData(User *MUser.User) types.Response {
	return types.Response{
		Success: true,
		Event:   "AUTH_AUTHORIZED",
		Result:  User,
	}
}
