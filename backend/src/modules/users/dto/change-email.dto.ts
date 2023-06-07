import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeEmailDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ required: true, example: 'contact@alfonsoprado.com' })
	email: string;
}

export default ChangeEmailDto;
