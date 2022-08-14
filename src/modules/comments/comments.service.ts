import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { IUser } from "../../shared/interfaces/user.interface";
import { CommentCreateDto } from "./dtos/create.dto";
import { getResponseMessage } from "../../shared/constants/messages.constant";
import { PostRepository } from "../post/post.repository";
import { Role } from "@prisma/client";
import {
  Comment,
  CommentWithChilds,
} from "../../shared/interfaces/comment.interface";

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
      const hasComment: CommentWithChilds | null =
        await this.commentsRepository.getById(replyId);
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

  async delete(commentId: number, user: IUser) {
    try {
      const comment: CommentWithChilds | null =
        await this.commentsRepository.getById(commentId);
      if (!comment)
        throw new NotFoundException(getResponseMessage("NOT_FOUND"));

      if (comment.authorId != user.id && !user.role.includes(Role.ADMIN)) {
        throw new ForbiddenException("PERMISSION_DENIED");
      }

      if (comment.childs.length)
        await this.commentsRepository.deleteChilds(commentId);

      await this.commentsRepository.deleteOne(comment.id);

      return getResponseMessage("SUCCESS").toString();
    } catch (e) {
      throw e;
    }
  }
}
