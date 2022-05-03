import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { ApiFile } from "src/common/decorators/api-File.decorator";
import CheckRoleGuard from "src/common/guards/check-roles.guard";
import { CreatePostDto } from "./dtos/createPost.dto";

import { PostService } from "./post.service";



@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Get()//TODO
  async getPublicPosts() { }

  @Post("/")
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiBearerAuth('jwt')
  @UseGuards(CheckRoleGuard(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async createPost(@UploadedFile() file: Express.Multer.File) {
    return file
  }

}

