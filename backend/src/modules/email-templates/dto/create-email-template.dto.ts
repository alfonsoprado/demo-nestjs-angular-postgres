import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEmailTemplateDto {
	@IsNotEmpty()
	@ApiProperty({ required: true, example: 'VALIDATE_EMAIL' })
	name: string;

	@IsNotEmpty()
	@ApiProperty({ required: true, example: 'Email Validation Confirmation' })
	subject: string;

	@IsNotEmpty()
	@ApiProperty({ required: true, example: '<b>Thank you</b> for registering with our platform! Before we can activate your account and provide you with the full access to our services, we kindly ask you to verify your email address.' })
	html: string;

	@IsNotEmpty()
	@ApiProperty({ required: true, example: 'Thank you for registering with our platform! Before we can activate your account and provide you with the full access to our services, we kindly ask you to verify your email address.' })
	txt: string;
}

export default CreateEmailTemplateDto;