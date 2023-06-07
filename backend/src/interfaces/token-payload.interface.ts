export enum TokenType {
	ACCOUNT_ACTIVATION = "ACCOUNT_ACTIVATION",
	VALIDATE_EMAIL = "VALIDATE_EMAIL",
	RECOVER_PASSWORD = "RECOVER_PASSWORD",
	SESSION = "SESSION",
}

interface TokenPayload {
	user_id: string;
	token_type: TokenType;
	data?: any;
}

export default TokenPayload;
