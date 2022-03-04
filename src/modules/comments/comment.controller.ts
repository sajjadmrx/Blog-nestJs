import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CommentService } from "./comment.service";
import { CommentDto } from "./model/comment.dto";

@Controller('api/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }




  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() comment: CommentDto) {
    return comment
  }
}