import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommentCreateDto } from "./dtos/create.dto";
import { CommentsService } from "./comments.service";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "../../shared/decorators/req-user.decorator";
import { IUser } from "../../shared/interfaces/user.interface";

@ApiTags("Comment")
@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({
    summary: "create a comment",
    description: "only Users",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(@Body() data: CommentCreateDto, @getUser() user: IUser) {
    return this.commentsService.create(data, user);
  }
}
