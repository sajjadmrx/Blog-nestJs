import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentEntity } from './model/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    AuthModule,
  ],
  controllers: [
    CommentController
  ],
  providers: [
    CommentService,
    CommentRepository
  ],
})
export class CommentModule { }