import { Module } from '@nestjs/common'

import { DATABASE_CONFIG } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }