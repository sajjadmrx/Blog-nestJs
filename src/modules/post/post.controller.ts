import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/common/decorators/req-user.decorator";
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

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(Number(id));
  }

}