import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createPost(post: CreatePostDto): Promise<IPost> {
    await this.validateExistingPost(post.title);
    return await this.postRepository.create(post as IPost);
  }


  async deletePost(id: number) {
    return this.postRepository.deleteById(id);
  }


  async validateExistingPost(title: string): Promise<void> {
    const post = await this.postRepository.findByTitle(title);
    if (post)
      throw new BadRequestException('Post already exists');
  }
}