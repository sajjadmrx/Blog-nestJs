import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';


import { DATABASE_CONFIG } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comments/comment.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }