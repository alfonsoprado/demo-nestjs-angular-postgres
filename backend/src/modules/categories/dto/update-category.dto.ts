import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @IsOptional()
    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: false,
		example: 'Javascript',
		description: 'Name of the category',
	})
    name: string;
}
