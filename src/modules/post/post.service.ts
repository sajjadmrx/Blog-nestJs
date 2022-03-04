import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { IPost } from 'src/common/interfaces/post.interface';
import { CreatePostDto } from './model/createPost.dto';
import { PostRepository } from './post.repository';


@Injectable()
export class PostService {

  constructor(
    private postRepository: PostRepository
  ) {

  }

  async getAll(): Promise<IPost[]> {
    return await this.postRepository.find(1, 10)
  }

  async createPost(post: CreatePostDto, authorId: number): Promise<IPost> {
    await this.validateExistingPost(post.title);
    const newPost: IPost = {
      authorId: authorId,
      title: post.title,
      content: post.content,
    }
    return await this.postRepository.create(newPost);
  }

  async updatePost(id: number, post: IPost): Promise<IPost> {
    const result = await this.postRepository.update(id, post);
    if (result.affected == 0)
      throw new BadRequestException('Post not found');

    return await this.postRepository.findById(id);
  }


  async deletePost(id: number): Promise<Number> {
    const result = await this.postRepository.delete(id);
    if (result.affected == 0)
      throw new BadRequestException('Post not found');

    return HttpStatus.OK

  }


  async validateExistingPost(title: string): Promise<void> {
    const post = await this.postRepository.findByTitle(title);
    if (post)
      throw new BadRequestException('Post already exists');
  }
}