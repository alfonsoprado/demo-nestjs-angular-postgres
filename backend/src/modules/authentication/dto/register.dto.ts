import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordValidation } from 'src/decorators/validators/password';
import { passwordRules } from 'src/config/password-rules';

export class RegisterDto {
	@IsNotEmpty()
	@ApiProperty({ required: true, example: 'alfonso_prado' })
	username: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ required: true, example: 'contact@alfonsoprado.com' })
	email: string;

	@IsNotEmpty()
	@Validate(PasswordValidation, passwordRules)
	@ApiProperty({ required: true, example: 'develop#2023' })
	password: string;
}

export default RegisterDto;
