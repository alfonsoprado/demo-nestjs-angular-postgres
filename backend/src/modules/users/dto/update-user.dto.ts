import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'The name can only contain alphanumeric characters, underscores, and digits.',
      })
    @ApiProperty({ required: true, example: 'alfonso_prado' })
    username: string;

    @IsOptional()
    @IsNotEmpty()
	@IsEmail()
	@ApiProperty({ required: true, example: 'contact@alfonsoprado.com' })
	email: string;
}

export default UpdateUserDto;
