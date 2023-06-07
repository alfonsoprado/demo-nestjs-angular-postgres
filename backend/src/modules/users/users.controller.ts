import { Controller, Get, Body, Param, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags  } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entities/user.entity';
import ChangeRoleDto from './dto/change-role.dto';
import QueryUserDto from './dto/query-user.dto';
import ChangePasswordDto from './dto/change-password.dto';
import ChangeEmailDto from './dto/change-email.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Roles(Role.Admin)
	@Put(':id/activate')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async activate(@Param('id') id: string) {
		await this.userService.activate(id);
	}

	@Roles(Role.Admin)
	@Put(':id/disable')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async disable(@Param('id') id: string) {
		return this.userService.disable(id);
	}

	@Roles(Role.Admin)
	@Put(':id/role')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async changeRole(
		@Param('id') id: string,
		@Body() changeRoleDto: ChangeRoleDto,
	) {
		return this.userService.changeRole(id, changeRoleDto);
	}

  	@Roles(Role.Admin)
	@Put(':id/password')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async changePassword(
		@Param('id') id: string,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return this.userService.changePassword(id, changePasswordDto.password);
	}

  	@Roles(Role.Admin)
	@Put(':id/email')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async changeEmail(
		@Param('id') id: string,
		@Body() changeEmailDto: ChangeEmailDto,
	) {
		return this.userService.changeEmail(id, changeEmailDto);
	}

	@Roles(Role.Admin)
	@Get()
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role' }) 
	async findAll(@Query() queryDto: QueryUserDto) {
		return this.userService.findAll(queryDto);
	}

	@Roles(Role.Admin)
	@Get(':id')
	@ApiOperation({ summary: 'Endpoint that can only be used by user with admin role' }) 
	async findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}
}