package SConfiguration

type TAuthentication struct {
	DefaultUser TDefaultUser
}

type TSecurity struct {
	Keys TKeys
}

type TIntegrations struct {
	Google TGoogleOAuthConfig
}

type TConfiguration struct {
	Host           string
	IsProduction   bool
	Database       TDatabase
	Authentication TAuthentication
	Security       TSecurity
	Integrations   TIntegrations
}
