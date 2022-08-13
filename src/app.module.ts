import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { PostModule } from "./modules/post/post.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UploadModule } from "./modules/upload/upload.module";
import { UserModule } from "./modules/users/users.module";
import { MailModule } from "./modules/mail/mail.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Configuration from "./configuration";
import { QueuesModule } from "./modules/queues/queues.module";
import { CommentsModule } from "./modules/comments/comments.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    QueuesModule,
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    UploadModule,
    CategoriesModule,
    MailModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
