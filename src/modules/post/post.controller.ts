import { Body, Controller, Post } from "@nestjs/common";
import { CreatePostDto } from "./model/createPost.dto";
import { PostService } from "./post.service";



@Controller('api/posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Post('create')
  async createPost(@Body() post: CreatePostDto) {
    return post
  }

}