import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
	@IsNotEmpty()
    @IsUUID()
	@ApiProperty({ required: true, example: "1926b380-f523-41e5-b527-d12ee54607d0" })
    category_id: string;

    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: true,
		example: 'How to Use Decorators in Typescript',
		description: 'Title of the post',
	})
    title: string;

    @IsNotEmpty()
	@IsString()
    @ApiProperty({
		required: true,
		example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum euismod sapien, a mollis elit malesuada in. Sed feugiat metus id ultrices posuere. Donec scelerisque enim et risus gravida, a pulvinar elit lacinia. Vestibulum vitae eleifend lectus, vitae lacinia lectus. Ut cursus tincidunt mi, ut posuere justo commodo eu. Quisque sed faucibus purus. Suspendisse potenti. Aenean feugiat dictum convallis. Nullam vestibulum, turpis a pulvinar aliquam, tortor ex ultricies nisl, a varius tellus dui vitae magna. Quisque maximus orci sit amet velit rutrum, nec efficitur velit consequat. Fusce aliquam feugiat vulputate.',
		description: 'Body of the post',
	})
    body: string;
}
