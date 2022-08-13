import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { IUser } from "../../shared/interfaces/user.interface";
import { CommentCreateDto } from "./dtos/create.dto";
import { getResponseMessage } from "../../shared/constants/messages.constant";
import { PostRepository } from "../post/post.repository";

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostRepository
  ) {}

  async create(data: CommentCreateDto, user: IUser) {
    const postId: number = data.postId;
    const hasPost = await this.postsRepository.findById(postId);
    if (!hasPost)
      throw new NotFoundException(getResponseMessage("POST_NOT_EXIST"));
    const replyId: number | null = data.replyId;
    if (replyId) {
      const hasComment = await this.commentsRepository.getById(replyId);
      if (!hasComment)
        throw new NotFoundException(getResponseMessage("NOT_FOUND")); //TODO better Message
    }

    const comment = await this.commentsRepository.create({
      postId,
      replyId,
      text: data.text,
      authorId: user.id,
    });
    return comment.id;
  }
}
