import { AppDataSource } from "./data-source"
import EmailTemplate from "./entities/email-template.entity";
import User, { Role } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

AppDataSource.initialize().then(async () => {
    await AppDataSource.manager
        .createQueryBuilder()
        .delete()
        .from(EmailTemplate)
        .execute()
    await AppDataSource.manager
        .createQueryBuilder()
        .delete()
        .from(User)
        .execute()

    const userRepository = AppDataSource.manager.getRepository(User);
    const emailTemplateRepository = AppDataSource.manager.getRepository(EmailTemplate);

    const user = new User();
    user.username = 'alfonso_prado';
    user.email = 'contact@alfonsoprado.com';
    user.password = await bcrypt.hash('develop#2023', 10);
    user.role = Role.Admin;
    user.validated_email_at = dayjs().toDate();
    await userRepository.save(user);

    let emailTemplate = new EmailTemplate();
    emailTemplate.name = 'ACCOUNT_ACTIVATION';
    emailTemplate.subject = 'Account Activation';
    emailTemplate.html = `<p>Dear {{username}},</p>

<p>Welcome to our app! We are thrilled to have you on board. Before you can start enjoying all the features and benefits, we kindly ask you to activate your account.</p>

<p>Click on the following link: <a href="{{link}}">Activate Account</a></p>

<p>Greetings</p>`;
    emailTemplate.txt = `Dear {{username}},

Welcome to our app! We are thrilled to have you on board. Before you can start enjoying all the features and benefits, we kindly ask you to activate your account.

Click on the following link: 

{{link}}

Greetings`;
    await emailTemplateRepository.save(emailTemplate);

    emailTemplate = new EmailTemplate();
    emailTemplate.name = 'VALIDATE_EMAIL';
    emailTemplate.subject = 'E-Mail Validation';
    emailTemplate.html = `<p>Dear {{username}},</p>

<p>This email is to verify that your email is: {{email}}</p>

<p>Click on the following link: <a href="{{link}}">Validate E-Mail</a></p>

<p>Greetings</p>`;
    emailTemplate.txt = `Dear {{username}},

This email is to verify that your email is: 

{{email}}

Click on the following link: 

{{link}}

Greetings`;
    await emailTemplateRepository.save(emailTemplate);

    emailTemplate = new EmailTemplate();
    emailTemplate.name = 'RECOVER_PASSWORD';
    emailTemplate.subject = 'Recover password';
    emailTemplate.html = `<p>Dear {{username}},</p>

<p>This email is to retrieve your account password.</p>

<p>Click on the following link: <a href="{{link}}">Recover password</a></p>

<p>Greetings</p>`;
    emailTemplate.txt = `Dear {{username}},

This email is to retrieve your account password.

Click on the following link: 

{{link}}

Greetings`;
    await emailTemplateRepository.save(emailTemplate);
}).catch(error => console.log(error))
