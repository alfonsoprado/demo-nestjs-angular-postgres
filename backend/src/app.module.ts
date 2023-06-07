// Nestjs
import { Module } from '@nestjs/common';

//Config
import EnvModule from './config/env.module';
import { DatabaseModule } from './config/database.module';
import { HealthController } from './healthcheck';

// Modules
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MyAccountModule } from './modules/my-account/my-account.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { EmailTemplatesModule } from './modules/email-templates/email-templates.module';

@Module({
  imports: [
    // Config
    EnvModule,
    DatabaseModule,
    // Endpoints
    CategoriesModule, 
    PostsModule, 
    CommentsModule,
    MyAccountModule,
    AuthenticationModule,
    UsersModule,
    EmailTemplatesModule
  ],
  controllers: [
    // Healthcheck: For kubernetes or docker :)
    HealthController
  ]
})
export class AppModule {}
