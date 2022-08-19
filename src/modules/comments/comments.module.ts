import { forwardRef, Module } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { PostModule } from "../post/post.module";

const providersAndExports = [CommentsRepository];
@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [CommentsController],
  providers: [...providersAndExports, CommentsService],
  exports: [...providersAndExports],
})
export class CommentsModule {}
