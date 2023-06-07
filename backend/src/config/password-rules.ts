import { PasswordValidationRequirement } from 'src/decorators/validators/password';

export const passwordRules: PasswordValidationRequirement[] = [
	{
		mustContainLowerLetter: true,
		mustContainNumber: true,
		mustContainSpecialCharacter: true,
		mustContainUpperLetter: true,
	},
];
