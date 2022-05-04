import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { getResponseMessage } from 'src/common/constants/messages.constant';
import { fileHasExist } from 'src/common/functions/fileValidator.func';
import { responseData } from 'src/common/functions/response.func';
import { CreatePostDto } from './dtos/createPost.dto';

import { PostRepository } from './post.repository';


@Injectable()
export class PostService {

  constructor(private postRepository: PostRepository) { }



  async create(userId: number, createPostDto: CreatePostDto) {

    try {
      if (createPostDto.cover) {

        const hasExist: boolean = await fileHasExist(createPostDto.cover, './uploads/posts');
        if (!hasExist) {
          throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
        }

      }
      const result = await this.postRepository.create({
        author: {
          connect: {
            id: userId
          }
        },
        ...createPostDto,
        published: false,
        cover: createPostDto.cover || "default.png"
      })

      return responseData({
        statusCode: "CREATED",
        message: getResponseMessage("SUCCESS"),

      })

    } catch (error) {
      throw error
    }

  }

}