import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
	@IsNotEmpty()
    @IsUUID()
	@ApiProperty({ 
        required: true, 
        example: "1926b380-f523-41e5-b527-d12ee54607d0" 
    })
    post_id: string;
  
    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: true,
        example: "I love Typescript.",
		description: 'Text of the comment',
	})
    text: string;
}
