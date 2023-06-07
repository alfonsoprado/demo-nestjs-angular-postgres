import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import EmailTemplate from 'src/entities/email-template.entity';
import { Repository } from 'typeorm';
import Handlebars from 'handlebars';
import { assertColumnNotUsed, assertRecordExists, pagination } from 'src/helpers/typeorm';
import QueryEmailTemplateDto from './dto/query-email-template.dto';
import CreateEmailTemplateDto from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';

@Injectable()
export class EmailTemplatesService {
	private transporter: mailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(EmailTemplate)
		private readonly emailTemplateRepository: Repository<EmailTemplate>,
	) {
		const env = configService.get('NODE_ENV');

		const trasporterData: any = {
			host: configService.get('EMAIL_HOST'),
			port: configService.get('EMAIL_PORT'),
			secure: configService.get('EMAIL_SECURE'),
		};

		const EMAIL_USER = configService.get('EMAIL_USER');
		const EMAIL_PASS = configService.get('EMAIL_PASS');
		if (EMAIL_USER && EMAIL_PASS) {
			trasporterData.auth = {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			};
		}

		this.transporter = mailer.createTransport(trasporterData);
	}

	async send(
		email: string,
		template: string,
		data: any = {},
		attachments: any[] = [],
	) {
		const emailTemplate = await assertRecordExists(
			this.emailTemplateRepository,
			{ name: template },
			"The template of the email does not exist."
		);

		const textTemplate = Handlebars.compile(emailTemplate.txt);
		const htmlTemplate = Handlebars.compile(emailTemplate.html);

		return this.transporter.sendMail({
			from: this.configService.get('EMAIL_FROM_ADDRESS'),
			to: email,
			subject: emailTemplate.subject,
			text: textTemplate(data),
			html: htmlTemplate(data),
			attachments,
		});
	}

	async findAll(queryCategoryDto: QueryEmailTemplateDto) {
		const dbQuery = this.emailTemplateRepository.createQueryBuilder();

		// Pagination
		pagination(dbQuery, queryCategoryDto);

		const [rows, totalRows] = await dbQuery.getManyAndCount();

		return {
			rows,
			totalRows
		};
	}

	async findOne(id: string) {
		const emailTemplate = await assertRecordExists(
			this.emailTemplateRepository,
			{ id },
			"The template does not exist."
		);
		return emailTemplate;
	}

	async create(
		emailTemplateDto: CreateEmailTemplateDto,
	) {
		let emailTemplate = this.emailTemplateRepository.create(
			emailTemplateDto,
		);

		await assertColumnNotUsed({
			repository: this.emailTemplateRepository,
			uniqueKeys: { name: emailTemplateDto.name },
			message: "The name of the template is already used."
		});

		return await this.emailTemplateRepository.save(emailTemplate);
	}

	async update(
		id: string,
		emailTemplateDto: UpdateEmailTemplateDto,
	) {
		let emailTemplate = this.emailTemplateRepository.create({
			id,
			...emailTemplateDto,
		});

		await assertRecordExists(
			this.emailTemplateRepository,
			{ id },
			"The template does not exist."
		);
		await assertColumnNotUsed({
			repository: this.emailTemplateRepository,
			uniqueKeys: { name: emailTemplate.name },
			message: "The name of the template is already used.",
			primaryKeys: {
				id
			}
		});

		return await this.emailTemplateRepository.save(emailTemplate);
	}

	async remove(
		id: string,
	) {
		const emailTemplate = await assertRecordExists(
			this.emailTemplateRepository,
			{ id },
			"The template does not exist."
		);

		return await this.emailTemplateRepository.remove(emailTemplate);
	}
}
