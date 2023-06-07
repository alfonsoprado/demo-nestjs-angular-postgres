import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: true,
		example: 'Typescript',
		description: 'Name of the category',
	})
    name: string;
}
