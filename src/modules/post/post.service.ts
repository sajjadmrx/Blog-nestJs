import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { unlink } from "fs/promises";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { fileHasExist } from "src/shared/functions/fileValidator.func";
import { responseData } from "src/shared/functions/response.func";
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
} from "src/shared/interfaces/post.interface";
import { CategoriesRepository } from "../categories/categories.repository";
import { CreatePostDto } from "./dtos/createPost.dto";
import { searchPostDto } from "./dtos/search.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

import { PostRepository } from "./post.repository";
import { getCategoriesData } from "./post.utility";
import { InjectQueue } from "@nestjs/bull";
import { QueuesConstant } from "../../shared/constants/queues.constant";
import { Queue } from "bull";
import { QueueDeleteFileCreate } from "../../shared/interfaces/queues.interface";
import { CommentsRepository } from "../comments/comments.repository";

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private categoriesRepository: CategoriesRepository,
    @InjectQueue(QueuesConstant.DELETE_FILE)
    private queueDeleteFile: Queue<QueueDeleteFileCreate>,
    private commentsRepository: CommentsRepository
  ) {}

  async getPublicPosts(search: searchPostDto) {
    let query: any = {};

    if (search.title) query.title = { contains: search.title };
    if (search.content) query.content = { contains: search.content };

    const page: number = Number(search.page) || 1;
    let limit: number = Number(search.limit) || 10;
    if (limit > 10) limit = 10;

    try {
      const posts: Post[] = await this.postRepository.findPublic(
        page,
        limit,
        query
      );
      const total = await this.postRepository.countPublished(query);
      const pages = Math.ceil(total / limit);
      const hasNext = page < pages;
      const hasPrev = page > 1;
      const nextPage = page + 1;

      return {
        posts,
        total,
        pages,
        hasNext,
        hasPrev,
        nextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async singlePost(id: number) {
    try {
      const post: Post = await this.postRepository.findById(id);

      if (!post || !post.published)
        throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"));
      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: {
          post,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(userId: number, createPostDto: CreatePostDto) {
    try {
      if (createPostDto.cover) {
        const hasExist: boolean = await fileHasExist(
          createPostDto.cover,
          "./uploads/posts"
        );
        if (!hasExist) {
          throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
        }
      }

      try {
        const valiadate: boolean =
          await this.categoriesRepository.hasExistWithIds(
            createPostDto.categories
          );
        if (!valiadate) throw new Error("catch");
      } catch (error) {
        throw new BadRequestException(
          getResponseMessage("CATEGORIES_NOT_EXIST")
        );
      }

      let tags: string;
      try {
        if (Array.isArray(createPostDto.tags))
          tags = JSON.stringify(createPostDto.tags);
        else throw new Error("catch");
      } catch (error) {
        throw new BadRequestException(getResponseMessage("TAGS_INVALID"));
      }

      const postInput: PostCreateInput = {
        ...createPostDto,
        tags: JSON.stringify(tags),
        authorId: userId,
        cover: createPostDto.cover || "default.png",
        categories: {
          create: getCategoriesData(createPostDto.categories),
        },
      };

      const post = await this.postRepository.create(postInput);

      return post.id;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, id: number, updatePostDto: UpdatePostDto) {
    try {
      if (updatePostDto.cover) {
        const hasExist: boolean = await fileHasExist(
          updatePostDto.cover,
          "./uploads/posts"
        );
        if (!hasExist) {
          throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
        }
      }

      try {
        const valiadate = await this.categoriesRepository.hasExistWithIds(
          updatePostDto.categories
        );
        if (!valiadate) throw new Error("catch");
      } catch (error) {
        throw new BadRequestException(
          getResponseMessage("CATEGORIES_NOT_EXIST")
        );
      }

      let tags: string;
      try {
        if (Array.isArray(updatePostDto.tags))
          tags = JSON.stringify(updatePostDto.tags);
        else throw new Error("catch");
      } catch (error) {
        throw new BadRequestException(getResponseMessage("TAGS_INVALID"));
      }
      const data: PostUpdateInput = {
        ...updatePostDto,
        tags: JSON.stringify(tags),
        authorId: userId,
        categories: {
          create: getCategoriesData(updatePostDto.categories),
        },
        cover: updatePostDto.cover || "default.png",
      };

      try {
        await this.postRepository.update(id, data);
      } catch (error) {
        throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"));
      }

      return {};
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number, id: number) {
    try {
      await this.commentsRepository.deleteCommentsByPostId(id);
      await this.postRepository.deleteCategoriesOnPost(id);
      const post: Post = await this.postRepository.delete(id);

      await this.queueDeleteFile.add({
        filename: post.cover,
        filePath: "./uploads/posts/",
        isFolder: false,
      });
    } catch (error) {
      throw new BadRequestException(getResponseMessage("POST_NOT_EXIST"));
    }
  }
}
