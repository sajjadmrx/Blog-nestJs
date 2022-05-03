import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterConfig } from "src/common/config/multer.config";
import { AuthModule } from "../auth/auth.module";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      useClass: MulterConfig
    })
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