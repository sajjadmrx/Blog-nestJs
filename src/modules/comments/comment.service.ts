import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentRepository } from "./comment.repository";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) { }



}