import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommentCreateDto } from "./dtos/create.dto";
import { CommentsService } from "./comments.service";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "../../shared/decorators/req-user.decorator";
import { User } from "../../shared/interfaces/user.interface";
import CheckRoleGuard from "../../shared/guards/check-roles.guard";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";

@ApiTags("Comment")
@UseInterceptors(ResponseInterceptor)
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
  async create(@Body() data: CommentCreateDto, @getUser() user: User) {
    return this.commentsService.create(data, user);
  }

  @ApiOperation({
    summary: "delete comment by commentId",
  })
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(["ADMIN", "USER"])) //ADMIN OR USER
  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async delete(@Param("id") commentId: string, @getUser() user: User) {
    return this.commentsService.delete(Number(commentId), user);
  }
}
