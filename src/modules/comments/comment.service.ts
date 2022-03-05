import { HttpStatus, Injectable, BadRequestException, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IComment } from "src/common/interfaces/comment.interface";
import { CommentRepository } from "./comment.repository";
import { CommentDto } from "./model/comment.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) { }


  getComments(page: number, limit: number): Promise<IComment[]> {
    return this.commentRepository.find(page, limit);
  }


  create(inputComment: CommentDto, userId: number): Promise<IComment> {
    const { content, parentId, postId } = inputComment;

    const comment: IComment = {
      content,
      parentId: Number(parentId) || 0,
      userId,
      postId
    }

    if (comment.parentId > 0) {
      // validate parentId
      //end 
    }

    //#ToDo: validate postId

    return this.commentRepository.create(comment);

  }


  async delete(commentId, userId) {
    const result = await this.commentRepository.delete(commentId)
    if (result.affected === 0)
      throw new BadRequestException('Comment not found');


    return HttpStatus.OK
  }

}