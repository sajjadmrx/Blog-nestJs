import { Module } from '@nestjs/common'

import { DATABASE_CONFIG } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostModule } from './modules/post/post.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/users/users.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    UploadModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }