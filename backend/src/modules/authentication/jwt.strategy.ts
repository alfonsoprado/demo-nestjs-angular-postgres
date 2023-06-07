import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import TokenPayload, { TokenType } from 'src/interfaces/token-payload.interface';
import User from 'src/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromUrlQueryParameter("token"), 
				ExtractJwt.fromHeader('authorization'), 
				ExtractJwt.fromExtractors([
					(request: Request) => {
						return request?.signedCookies?.token;
					},
				])
			]),
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: TokenPayload) {
		if(payload.token_type !== TokenType.SESSION) {
			throw new HttpException(
				"Invalid token.",
				HttpStatus.UNAUTHORIZED,
			);
		} 
		
		let user: User;
		try {
			user = await this.userService.getById(payload.user_id);

			if(user.disabled_at) {
				throw new HttpException(
					"The account has been deactivated.",
					HttpStatus.UNAUTHORIZED,
				);
			}

			if(!user.validated_email_at) {
				throw new HttpException(
					"The account has not been activated.",
					HttpStatus.UNAUTHORIZED,
				);
			}
		} catch (e) {
			throw new HttpException(
				"Unauthorized.",
				HttpStatus.UNAUTHORIZED,
			);
		}

		return user;
	}
}
