import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmailTemplate from 'src/entities/email-template.entity';
import { EmailTemplatesService } from './email-templates.service';
import { EmailTemplatesController } from './email-templates.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailTemplate]), 
    ConfigModule
  ],
  controllers: [EmailTemplatesController],
  providers: [EmailTemplatesService],
  exports: [EmailTemplatesService],
})
export class EmailTemplatesModule {}
