import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateCommentDto {
    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: true,
        example: "I love Javascript.",
		description: 'Text of the comment',
	})
    text: string;
}
