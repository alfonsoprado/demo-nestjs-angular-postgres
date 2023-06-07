import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('DB_HOST'),
					port: configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_DATABASE'),
					entities: [__dirname + '/../**/*.{ts,js}'],
					logging: configService.get('DB_LOGGING'),
					synchronize: false,
					extra: {
						charset: 'utf8mb4_unicode_ci',
					},
				};
			},
		}),
	],
})
export class DatabaseModule {}
