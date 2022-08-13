import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CategoriesModule } from "../categories/categories.module";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
  imports: [AuthModule, CategoriesModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository],
})
export class PostModule {}
