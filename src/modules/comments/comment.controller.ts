import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/common/decorators/req-user.decorator";
import { CommentService } from "./comment.service";
import { CommentDto } from "./model/comment.dto";

@Controller('api/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }


  @Get()
  async find(@Param('page') page: number = 1, @Param('limit') limit: number = 10) {
    return await this.commentService.getComments(page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() comment: CommentDto, @getUser('id') userId: number) {
    return this.commentService.create(comment, userId);
  }

  //#TODO: Check if user is owner of comment
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') commentId: string, @getUser('id') userId: number) {
    return await this.commentService.delete(commentId, userId);
  }


  //#ToDo Update Comment


}