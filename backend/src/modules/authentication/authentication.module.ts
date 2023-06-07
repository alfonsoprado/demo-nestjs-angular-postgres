import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { EmailTemplatesModule } from 'src/modules/email-templates/email-templates.module';

@Module({
  imports: [
		UsersModule,
		EmailTemplatesModule,
		ConfigModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('SESSION_TOKEN_EXPIRATION_TIME')}ms`,
				},
			}),
		}),
	],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService, 
    LocalStrategy, 
    JwtStrategy
  ]
})
export class AuthenticationModule {}
