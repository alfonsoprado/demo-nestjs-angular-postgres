import { Controller, Get, Body, Put } from '@nestjs/common';
import { MyAccountService } from './my-account.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import User from 'src/entities/user.entity';
import ChangeEmailDto from '../users/dto/change-email.dto';
import ChangePasswordDto from './dto/change-password.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('my-account')
@ApiTags('My Account')
export class MyAccountController {
	constructor(private readonly myAccountService: MyAccountService) { }

	@Get()
	@ApiOperation({ summary: 'Endpoint that requires authentication.' })
	async myAccount(@CurrentUser() user: User) {
		return user;
	}

	@Put('change/email')
	@ApiOperation({ summary: 'Endpoint that requires authentication.' })
	async changeEmail(
		@CurrentUser() user: User,
		@Body() changeEmailDto: ChangeEmailDto,
	) {
		return this.myAccountService.changeEmail(user, changeEmailDto);
	}

	@Put('change/password')
	@ApiOperation({ summary: 'Endpoint that requires authentication.' })
	async changePassword(@CurrentUser() user: User, @Body() changePassword: ChangePasswordDto) {
		return this.myAccountService.changePassword(user, changePassword);
	}
}
