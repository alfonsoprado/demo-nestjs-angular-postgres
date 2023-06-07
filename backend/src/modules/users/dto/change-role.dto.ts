import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Role } from 'src/entities/user.entity';

export class ChangeRoleDto {
	@IsIn(['admin', 'user'], {
		context: { list: ['admin', 'user'] },
	})
	@ApiProperty({
		required: true,
		example: 'user',
		enum: ['admin', 'user'],
	})
	role: Role;
}

export default ChangeRoleDto;
