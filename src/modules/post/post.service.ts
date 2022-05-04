import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/createPost.dto';

import { PostRepository } from './post.repository';


@Injectable()
export class PostService {

  constructor(private postRepository: PostRepository) { }



  async create(userId: number, createPostDto: CreatePostDto) {
    const result = await this.postRepository.create({
      author: {
        connect: {
          id: userId
        }
      },
      ...createPostDto,
      published: false,
      conver: "default.jpg"
    })
    return result;
  }

}