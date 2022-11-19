import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CategoriesModule } from "../categories/categories.module";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { CommentsModule } from "../comments/comments.module";
import { PostResolver } from "./post.resolver";

@Module({
  imports: [AuthModule, CategoriesModule, CommentsModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostResolver],
  exports: [PostRepository],
})
export class PostModule {}
