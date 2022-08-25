import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { User } from "../../shared/interfaces/user.interface";
import { CommentCreateDto } from "./dtos/create.dto";
import { getResponseMessage } from "../../shared/constants/messages.constant";
import { PostRepository } from "../post/post.repository";
import {
  Comment,
  CommentWithChilds,
} from "../../shared/interfaces/comment.interface";
import { Role } from "../../shared/interfaces/role.interface";

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostRepository
  ) {}

  async create(data: CommentCreateDto, user: User) {
    const postId: number = data.postId;
    const hasPost = await this.postsRepository.findById(postId);
    if (!hasPost)
      throw new NotFoundException(getResponseMessage("POST_NOT_EXIST"));
    const replyId: number | null = data.replyId;
    if (replyId) {
      const hasComment: CommentWithChilds | null =
        await this.commentsRepository.getById(replyId);
      if (!hasComment)
        throw new NotFoundException(
          getResponseMessage("REPLY_COMMENT_NOT_FOUND")
        );
    }

    const comment = await this.commentsRepository.create({
      postId,
      replyId,
      text: data.text,
      authorId: user.id,
    });
    return comment.id;
  }

  async delete(commentId: number, user: User) {
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

      return {};
    } catch (e) {
      throw e;
    }
  }
}
