import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateEmailTemplateDto {
    @IsOptional()
    @IsNotEmpty()
	@ApiProperty({ required: false, example: 'VALIDATE_EMAIL' })
	name: string;

    @IsOptional()
	@IsNotEmpty()
	@ApiProperty({ required: false, example: 'Email Validation Confirmation' })
	subject: string;

    @IsOptional()
	@IsNotEmpty()
	@ApiProperty({ required: false, example: '<b>Thank you</b> for registering with our platform! Before we can activate your account and provide you with the full access to our services, we kindly ask you to verify your email address.' })
	html: string;

    @IsOptional()
	@IsNotEmpty()
	@ApiProperty({ required: false, example: 'Thank you for registering with our platform! Before we can activate your account and provide you with the full access to our services, we kindly ask you to verify your email address.' })
	txt: string;
}
