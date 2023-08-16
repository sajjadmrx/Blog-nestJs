import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CategoriesModule } from "../categories/categories.module";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { CommentsModule } from "../comments/comments.module";
import { PostResolver } from "./post.resolver";
import { LoggingModule } from "../logging/logging.module";
import { ConsoleLogger } from "../logging/loggers/console.logger";

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    CommentsModule,
    LoggingModule.register(new ConsoleLogger()),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostResolver],
  exports: [PostRepository],
})
export class PostModule {}
