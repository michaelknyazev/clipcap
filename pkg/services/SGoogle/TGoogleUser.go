package SGoogle

type TGoogleUser struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Verified  bool   `json:"verified_email"`
	Name      string `json:"name"`
	FirstName string `json:"given_name"`
	LastName  string `json:"family_name"`
	Picture   string `json:"picture"`
	Locale    string `json:"locale"`
	HD        string `json:"hd"`
}
