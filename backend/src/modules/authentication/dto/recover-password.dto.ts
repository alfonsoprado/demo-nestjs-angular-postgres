import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ required: true, example: 'contact@alfonsoprado.com' })
	email: string;
}

export default RecoverPasswordDto;
