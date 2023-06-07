import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from 'src/entities/user.entity';
import ChangeEmailDto from 'src/modules/users/dto/change-email.dto';
import { EmailTemplatesService } from 'src/modules/email-templates/email-templates.service';
import { JwtService } from '@nestjs/jwt';
import TokenPayload, { TokenType } from 'src/interfaces/token-payload.interface';
import ChangePasswordDto from './dto/change-password.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MyAccountService {
	constructor(
		private readonly emailTemplatesService: EmailTemplatesService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly userService: UsersService
	) { }

	async changeEmail(currentUser: User, changeEmail: ChangeEmailDto) {
		const payload: TokenPayload = {
			user_id: currentUser.id,
			token_type: TokenType.VALIDATE_EMAIL,
			data: changeEmail
		};

		const token = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('EMAIL_TOKEN_EXPIRATION_TIME'),
		});
		const link = `${this.configService.get('EMAIL_URL')}/${TokenType.VALIDATE_EMAIL.toLocaleLowerCase()}?token=${token}`;


		await this.emailTemplatesService.send(
			changeEmail.email,
			TokenType.VALIDATE_EMAIL,
			{
				...currentUser,
				link
			}
		);

		return changeEmail;
	}

	async changePassword(currentUser: User, changePassword: ChangePasswordDto) {
		this.userService.verifyPassword(currentUser.id, changePassword.oldPassword);
		this.userService.changePassword(currentUser.id, changePassword.newPassword);
	}
}
