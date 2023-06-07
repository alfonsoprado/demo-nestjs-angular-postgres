import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ required: true, example: 'contact@alfonsoprado.com' })
	email: string;

	@IsNotEmpty()
	@ApiProperty({ required: false, example: 'develop#2023' })
	password: string;
}

export default LogInDto;
