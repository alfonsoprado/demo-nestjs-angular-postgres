import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { passwordRules } from 'src/config/password-rules';
import { PasswordValidation } from 'src/decorators/validators/password';

export class ChangePasswordDto {
	@Validate(PasswordValidation, passwordRules)
	@ApiProperty({
		required: true,
		example: '$OLD#Password'
	})
	oldPassword: string;

	@Validate(PasswordValidation, passwordRules)
	@ApiProperty({
		required: true,
		example: '$NEW#Password'
	})
	newPassword: string;
}

export default ChangePasswordDto;
