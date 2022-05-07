import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { getUser } from "src/common/decorators/req-user.decorator";
import CheckRoleGuard from "src/common/guards/check-roles.guard";
import { CreatePostDto } from "./dtos/createPost.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

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


  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  async updatePost(@getUser('id') userId: number, @Param('id') id: string, @Body() createPostDto: UpdatePostDto) {
    return this.postService.update(userId, Number(id), createPostDto);
  }

}

