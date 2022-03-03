import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { PostEntity } from "./model/post.entity";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    PostRepository
  ],
})
export class PostModule { }