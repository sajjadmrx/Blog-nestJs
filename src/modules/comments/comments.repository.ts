import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  Comment,
  CommentCreateInput,
} from "../../shared/interfaces/comment.interface";

@Injectable()
export class CommentsRepository {
  constructor(private db: PrismaService) {}

  async create(input: CommentCreateInput) {
    return this.db.comment.create({ data: input });
  }

  async getById(id: number): Promise<Comment | null> {
    return this.db.comment.findUnique({ where: { id } });
  }
}
