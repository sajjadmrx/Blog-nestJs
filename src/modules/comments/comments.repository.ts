import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  Comment,
  CommentCreateInput,
  CommentWithChilds,
} from "../../shared/interfaces/comment.interface";
import { Prisma } from "@prisma/client";
import { BatchPayload } from "../../shared/interfaces/repository.interface";

@Injectable()
export class CommentsRepository {
  constructor(private db: PrismaService) {}

  async create(input: CommentCreateInput) {
    return this.db.comment.create({ data: input });
  }

  async getById(id: number): Promise<CommentWithChilds | null> {
    return this.db.comment.findUnique({
      where: { id },
      include: { childs: true },
    });
  }

  async deleteOne(id: number): Promise<Comment> {
    return this.db.comment.delete({
      where: {
        id,
      },
    });
  }
  async deleteChilds(pId: number): Promise<number> {
    try {
      const result: BatchPayload = await this.db.comment.deleteMany({
        where: {
          replyId: pId,
        },
      });
      return result.count;
    } catch (e) {
      throw e;
    }
  }

  async deleteCommentsByPostId(postId: number): Promise<BatchPayload> {
    return this.db.comment.deleteMany({
      where: { postId },
    });
  }
}
