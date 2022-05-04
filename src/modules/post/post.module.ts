import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
  imports: [
    AuthModule,
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