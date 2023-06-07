import { Controller, Post, Body, UseGuards, Res, Put, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from 'src/decorators/public.decorator';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import LogInDto from './dto/log-in.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import User from 'src/entities/user.entity';
import { Response } from 'express';
import TokenDto from './dto/token.dto';
import RecoverPasswordDto from './dto/recover-password.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) { }

	@Public()
	@Post('register')
	@ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
	async register(@Body() registrationDto: RegisterDto) {
		const user = await this.authenticationService.register(registrationDto);
		return user;
	}

	@Public()
	@UseGuards(LocalAuthenticationGuard)
	@ApiBody({
		type: LogInDto,
	})
	@Post('login')
	@HttpCode(200)
	@ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
	async logIn(@CurrentUser() user: User, @Res() response: Response) {
		const [access_token, cookieOptions] = this.authenticationService.getCookieWithJwtToken(user);
		response.cookie('token', access_token, cookieOptions).send({
			access_token
		});
	}

	@Post('logout')
	@HttpCode(200)
	async logOut(@Res() response: Response) {
		response.clearCookie('token').status(200).end();
	}

	@Public()
	@Put('token')
	@ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
	async changePassword(@Body() tokenDto: TokenDto) {
		await this.authenticationService.processToken(tokenDto);
	}

	@Public()
	@Post('recover/password')
	@HttpCode(200)
	@ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
	async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
		await this.authenticationService.recoverPassword(recoverPasswordDto);
	}
}
