import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { getUser } from "src/common/decorators/req-user.decorator";
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
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  async createPost(@getUser('id') userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto);
  }

}

