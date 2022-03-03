import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
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


  @Post('create')
  async createPost(@Body() post: CreatePostDto) {
    return await this.postService.createPost(post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(Number(id));
  }

}