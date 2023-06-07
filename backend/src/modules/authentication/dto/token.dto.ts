import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class TokenDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ required: true })
	token: string;

	@IsOptional()
	@ApiProperty({ required: false, description: "It is only used in the case when the password is changed using a token." })
	password?: string;
}

export default TokenDto;
