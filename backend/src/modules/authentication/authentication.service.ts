import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { EmailTemplatesService } from 'src/modules/email-templates/email-templates.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import RegisterDto from './dto/register.dto';
import TokenPayload, { TokenType } from 'src/interfaces/token-payload.interface';
import User from 'src/entities/user.entity';
import TokenDto from './dto/token.dto';
import RecoverPasswordDto from './dto/recover-password.dto';
import { CookieOptions } from 'express';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly emailTemplatesService: EmailTemplatesService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) { }

	async register(registrationData: RegisterDto) {
		const createdUser = await this.usersService.create({
			username: registrationData.username,
			email: registrationData.email,
			password: registrationData.password
		});

		const payload: TokenPayload = {
			user_id: createdUser.id,
			token_type: TokenType.ACCOUNT_ACTIVATION
		};

		const token = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('EMAIL_TOKEN_EXPIRATION_TIME'),
		});
		const link = `${this.configService.get('EMAIL_URL')}/${TokenType.ACCOUNT_ACTIVATION.toLocaleLowerCase()}?token=${token}`;;


		await this.emailTemplatesService.send(
			createdUser.email,
			TokenType.ACCOUNT_ACTIVATION,
			{
				username: registrationData.username,
				email: registrationData.email,
				link
			}
		);

		return createdUser;
	}

	async getAuthenticatedUser(email: string, plainTextPassword: string) {
		const user = await this.usersService.getByEmail(email);

		if (user.disabled_at) {
			throw new HttpException(
				"The account has been deactivated",
				HttpStatus.UNAUTHORIZED,
			);
		}

		if(!user.validated_email_at) {
			throw new HttpException(
				"The account has not been activated",
				HttpStatus.UNAUTHORIZED,
			);
		}

		await this.usersService.verifyPassword(user.id, plainTextPassword);

		return user;
	}

	getCookieWithJwtToken(user: User): [string, CookieOptions] {
		const jwtExpirationTime = this.configService.get('SESSION_TOKEN_EXPIRATION_TIME');
		const payload: TokenPayload = { 
			user_id: user.id,
			token_type: TokenType.SESSION
		 };
		const access_token = this.jwtService.sign(payload);

		const cookieOptions: CookieOptions = {
			sameSite: 'strict',
			httpOnly: true,
			maxAge: jwtExpirationTime,
			path: '/',
			signed: true,
		};

		return [access_token, cookieOptions];
	}

	async processToken(tokenDto: TokenDto) {
		const decodedToken = this.jwtService.decode(tokenDto.token) as TokenPayload;
		if(!decodedToken) {
			throw new HttpException(
				"Invalid token.",
				HttpStatus.BAD_REQUEST,
			);
		}
		let user = await this.usersService.findOne(decodedToken.user_id);

		if(user.disabled_at) {
			throw new HttpException(
				"The account has been deactivated.",
				HttpStatus.UNAUTHORIZED,
			);
		}

		switch (decodedToken.token_type) {
			case TokenType.ACCOUNT_ACTIVATION:
				if(user.validated_email_at) {
					throw new HttpException(
						"The account has already been activated.",
						HttpStatus.UNAUTHORIZED,
					);
				}
				return this.usersService.validateEmail(user);
			case TokenType.VALIDATE_EMAIL:
				user.email = decodedToken.data.email;
				return this.usersService.validateEmail(user);
			case TokenType.RECOVER_PASSWORD:
				user.email = decodedToken.data.email;
				return this.usersService.changePassword(user.id, tokenDto.password);
			default:
				throw new HttpException(
					"Invalid token.",
					HttpStatus.BAD_REQUEST,
				);
		}
	}

	async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
		let user = await this.usersService.findOne(recoverPasswordDto.email);

		const payload: TokenPayload = {
			user_id: user.id,
			token_type: TokenType.RECOVER_PASSWORD
		};

		const token = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('EMAIL_TOKEN_EXPIRATION_TIME'),
		});
		const link = `${this.configService.get('EMAIL_URL')}/${TokenType.RECOVER_PASSWORD.toLocaleLowerCase()}?token=${token}`;


		await this.emailTemplatesService.send(
			user.email,
			TokenType.VALIDATE_EMAIL,
			{
				...user,
				link
			}
		);

		return user;
	}
}
