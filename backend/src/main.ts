import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import JwtAuthenticationGuard from './modules/authentication/jwt-authentication.guard';
import { RolesGuard } from './guards/roles.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
		origin: (origin, callback) => {
			callback(
				null,
				!origin || config.get('CORS_ORIGINS').indexOf(origin) !== -1,
			);
		},
		credentials: true,
	});
	app.use(cookieParser(config.get('JWT_SECRET')));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: false,
			exceptionFactory: (errors: ValidationError[]) => {
				return new BadRequestException(errors);
			},
		}),
	);
	const reflector = app.get(Reflector);
	app.useGlobalGuards(
		new JwtAuthenticationGuard(reflector),
		new RolesGuard(reflector),
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  if (config.get('NODE_ENV') !== 'prod') {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('Demo: News Manager')
			.setDescription('Demo endpoint documentation.')
      		.setContact("Alfonso Prado", "https://alfonsoprado.com", "contact@alfonsoprado.com")
			.setVersion('1.0')
			.build();
		const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup('/', app, swaggerDocument);
	}

  await app.listen(config.get('PORT'));
}
bootstrap();
