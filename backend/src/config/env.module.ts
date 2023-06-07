import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { msValidator } from 'src/helpers/env';

export default ConfigModule.forRoot({
	validationSchema: Joi.object({
		// Env
		NODE_ENV: Joi.allow('local', 'develop', 'test', 'production').required(),
		PORT: Joi.number().required(),
		CORS_ORIGINS: Joi.string().required(),
		JWT_SECRET: Joi.string().required(),
		SESSION_TOKEN_EXPIRATION_TIME: Joi.string().required().custom(msValidator),
		// Database
		DB_HOST: Joi.string().required(),
		DB_PORT: Joi.number().required(),
		DB_USERNAME: Joi.string().required(),
		DB_PASSWORD: Joi.string().required(),
		DB_DATABASE: Joi.string().required(),
		DB_LOGGING: Joi.boolean().required(),
		// Mail
		EMAIL_URL: Joi.string().required(),
		EMAIL_HOST: Joi.string().required(),
		EMAIL_PORT: Joi.string().required(),
		EMAIL_SECURE: Joi.boolean().required(),
		EMAIL_USER: Joi.string().empty(''),
		EMAIL_PASS: Joi.string().empty(''),
		EMAIL_FROM_ADDRESS: Joi.string().required(),
		EMAIL_TOKEN_EXPIRATION_TIME: Joi.string().required().custom(msValidator),
	}),
});
