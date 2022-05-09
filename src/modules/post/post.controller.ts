import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

import { getUser } from "src/common/decorators/req-user.decorator";
import CheckRoleGuard from "src/common/guards/check-roles.guard";
import { CreatePostDto } from "./dtos/createPost.dto";
import { searchPostDto } from "./dtos/search.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

import { PostService } from "./post.service";



@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }


  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'content', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getPublicPosts(@Query() query: searchPostDto) {
    return this.postService.getPublicPosts(query);
  }


  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async getPost(@Param('id') id: string) {
    return this.postService.singlePost(Number(id));
  }

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

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@getUser('id') userId: number, @Param('id') id: string) {
    return this.postService.delete(userId, Number(id));
  }


}

