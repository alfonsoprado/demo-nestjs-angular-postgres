import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

export interface PasswordValidationRequirement {
	mustContainSpecialCharacter?: boolean;
	mustContainUpperLetter?: boolean;
	mustContainLowerLetter?: boolean;
	mustContainNumber?: boolean;
}

export class StringUtilities {
	/**
	 * Checks if a string contains uppercase letters
	 * @param value The string value to test
	 * @returns Returns true if it contains uppercase
	 */
	static containsUpperCase(value: string): boolean {
		return /[A-Z]/.test(value);
	}

	/**
	 * Checks if a string contains lowercase letters
	 * @param value The string value to test
	 * @returns Returns true if it contains lowercase
	 */
	static containsLowerCase(value: string): boolean {
		return /[a-z]/.test(value);
	}

	/**
	 * Checks if a string contains digit/number (0-9)
	 * @param value The string value to test
	 * @returns Returns true if it contains digit/number
	 */
	static containsNumber(value: string): boolean {
		return /[0-9]/.test(value);
	}

	/**
	 * Checks if a string contains special character [!#$%&'()*+,-./:;<=>?@[\]^_{|}~]
	 * @param value The string value to test
	 * @returns Returns true if it contains special character
	 */
	static containsSpecialCharacter(value: string): boolean {
		return /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/.test(value);
	}
}

export function IsPasswordValid(
	property: PasswordValidationRequirement,
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isPasswordValid',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!value) {
						return false;
					}

					const relatedValue = args
						.constraints[0] as PasswordValidationRequirement;

					if (relatedValue.mustContainUpperLetter) {
						if (!StringUtilities.containsUpperCase(value)) return false;
					}

					if (relatedValue.mustContainLowerLetter) {
						if (!StringUtilities.containsLowerCase(value)) return false;
					}

					if (relatedValue.mustContainNumber) {
						if (!StringUtilities.containsNumber(value)) return false;
					}

					if (relatedValue.mustContainSpecialCharacter) {
						if (!StringUtilities.containsSpecialCharacter(value)) return false;
					}

					return true;
				},
			},
		});
	};
}

@ValidatorConstraint({ name: 'passwordValidation', async: false })
export class PasswordValidation implements ValidatorConstraintInterface {
	validate(value: string, args: ValidationArguments) {
		if (!value) {
			return false;
		}

		const relatedValue = args.constraints[0] as PasswordValidationRequirement;

		if (relatedValue.mustContainUpperLetter) {
			if (!StringUtilities.containsUpperCase(value)) return false;
		}

		if (relatedValue.mustContainLowerLetter) {
			if (!StringUtilities.containsLowerCase(value)) return false;
		}

		if (relatedValue.mustContainNumber) {
			if (!StringUtilities.containsNumber(value)) return false;
		}

		if (relatedValue.mustContainSpecialCharacter) {
			if (!StringUtilities.containsSpecialCharacter(value)) return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		const value = args.value;

		const code = 'class-validator.passwordValidation';
		if (!value) {
			return `${code}.isRequired`; //'The password is required';
		}

		const relatedValue = args.constraints[0] as PasswordValidationRequirement;

		if (relatedValue.mustContainUpperLetter) {
			if (!StringUtilities.containsUpperCase(value))
				return `${code}.mustContainUpperLetter`; //'Password must conatin uppercase';
		}

		if (relatedValue.mustContainLowerLetter) {
			if (!StringUtilities.containsLowerCase(value))
				return `${code}.mustContainLowerLetter`; //'Password must contain lowercase';
		}

		if (relatedValue.mustContainNumber) {
			if (!StringUtilities.containsNumber(value))
				return `${code}.mustContainNumber`; //'Password must contain number';
		}

		if (relatedValue.mustContainSpecialCharacter) {
			if (!StringUtilities.containsSpecialCharacter(value))
				return `${code}.mustContainSpecialCharacters`; //'Password must contain special characters';
		}

		return '';
	}
}
