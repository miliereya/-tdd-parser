export interface IUserRegister {
	email: string
}

export interface IUserLogin {
	email: string
}

export interface IUserSendCode {
	email: string
	code: string
}

export interface IUserConfirmEmail {
	email: string
	token: string
}
