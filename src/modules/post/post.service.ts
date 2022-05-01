import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';

import { PostRepository } from './post.repository';


@Injectable()
export class PostService {

  constructor(private postRepository: PostRepository) { }

}