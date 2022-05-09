import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { getResponseMessage } from 'src/common/constants/messages.constant';
import { fileHasExist } from 'src/common/functions/fileValidator.func';
import { responseData } from 'src/common/functions/response.func';
import { IPost, IPostCreateInput } from 'src/common/interfaces/post.interface';
import { CreatePostDto } from './dtos/createPost.dto';
import { searchPostDto } from './dtos/search.dto';
import { UpdatePostDto } from './dtos/updatePost.dto';

import { PostRepository } from './post.repository';


@Injectable()
export class PostService {

  constructor(private postRepository: PostRepository) { }


  async getPublicPosts(search: searchPostDto) {
    let query: any = {};

    if (search.title)
      query.title = { contains: search.title }
    if (search.content)
      query.content = { contains: search.content }

    const page: number = Number(search.page) || 1;
    let limit: number = Number(search.limit) || 10;
    if (limit > 10) limit = 10;


    try {
      const posts: IPost[] = await this.postRepository.findPublic(page, limit, query);
      const total = await this.postRepository.countPublished(query);
      const pages = Math.ceil(total / limit);
      const hasNext = page < pages;
      const hasPrev = page > 1;
      const nextPage = page + 1;

      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: {
          posts,
          total,
          pages,
          hasNext,
          hasPrev,
          nextPage
        }
      })
    } catch (error) {
      throw error
    }

  }

  async singlePost(id: number) {
    try {
      const post: IPost = await this.postRepository.findById(id)

      if (!post || !post.published)
        throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: {
          post
        }
      })
    } catch (error) {
      throw error
    }
  }

  async create(userId: number, createPostDto: CreatePostDto) {

    try {

      //TODO : create class for file validator in upload module
      if (createPostDto.cover) {

        const hasExist: boolean = await fileHasExist(createPostDto.cover, './uploads/posts');
        if (!hasExist) {
          throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
        }
      }

      const post: IPostCreateInput = {
        ...createPostDto,
        //      published: false,
        author: {
          connect: {
            id: userId
          }
        },
        cover: createPostDto.cover || "default.png"
      }

      await this.postRepository.create(post)

      return responseData({
        statusCode: "CREATED",
        message: getResponseMessage("SUCCESS"),

      })

    } catch (error) {
      throw error
    }

  }

  async update(userId: number, id: number, createPostDto: UpdatePostDto) {
    try {


      if (createPostDto.cover) {

        const hasExist: boolean = await fileHasExist(createPostDto.cover, './uploads/posts'); //TODO : create class for file validator in upload module
        if (!hasExist) {
          throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
        }

      }


      try {
        await this.postRepository.update(id, createPostDto)
      } catch (error) {
        throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      }


      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
      })


    } catch (error) {
      throw error
    }
  }

  async delete(userId: number, id: number) {
    try {
      const post: IPost = await this.postRepository.delete(id)
      try {
        await unlink(`./uploads/posts/${post.cover}`)
      } catch (error) {

      } finally {
        return responseData({
          statusCode: "OK",
          message: getResponseMessage("SUCCESS")
        })
      }
    } catch (error) {
      throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
    }
  }

}