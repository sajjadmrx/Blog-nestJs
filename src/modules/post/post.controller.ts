import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/common/decorators/req-user.decorator";
import { IPost } from "src/common/interfaces/post.interface";
import { CreatePostDto } from "./model/createPost.dto";
import { PostService } from "./post.service";



@Controller('api/posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Get()
  async getAll() {
    return await this.postService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPost(@Body() post: CreatePostDto, @getUser('id') authorId: number) {
    return await this.postService.createPost(post, authorId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: IPost) {
    return await this.postService.updatePost(Number(id), post);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(Number(id));
  }



}