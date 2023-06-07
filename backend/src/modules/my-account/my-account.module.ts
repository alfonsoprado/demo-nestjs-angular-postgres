import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyAccountService } from './my-account.service';
import { MyAccountController } from './my-account.controller';
import { EmailTemplatesModule } from 'src/modules/email-templates/email-templates.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    EmailTemplatesModule, 
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('EMAIL_TOKEN_EXPIRATION_TIME')}ms`,
				},
			}),
		}),
  ],
  controllers: [MyAccountController],
  providers: [MyAccountService]
})
export class MyAccountModule {}
