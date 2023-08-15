import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CommentCreateDto } from "./dtos/create.dto";
import { CommentsService } from "./comments.service";
import { getUser } from "../../shared/decorators/req-user.decorator";
import { User } from "../../shared/interfaces/user.interface";
import CheckRoleGuard from "../../shared/guards/check-roles.guard";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { QueryDto } from "./dtos/query.dto";
import { authGuard } from "../../shared/guards/auth.guard";

@ApiTags("Comment")
@UseInterceptors(ResponseInterceptor)
@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: "get comments" })
  @ApiQuery({
    name: "postId",
    example: 1,
    type: String,
    required: false,
    description: `get comments on a post by Post Id.
      If you are an admin, you can send empty for get All Comments`,
  })
  @ApiQuery({
    name: "limit",
    example: 10,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: "page",
    example: 1,
    type: String,
    required: false,
  })
  //  @ApiBearerAuth()
  @UseGuards(authGuard(true))
  @Get("")
  getAll(@Query() query: QueryDto, @getUser() user: User | null) {
    return this.commentsService.getAll(query, user);
  }

  @ApiOperation({
    summary: "create a comment",
    description: "only Users",
  })
  @ApiBearerAuth()
  @UseGuards(authGuard(false))
  @Post()
  async create(@Body() data: CommentCreateDto, @getUser() user: User) {
    return this.commentsService.create(data, user);
  }

  @ApiOperation({
    summary: "delete comment by commentId",
  })
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(["ADMIN", "USER", "MANAGE_COMMENTS"])) //ADMIN OR USER(self comment)
  @UseGuards(authGuard(false))
  @Delete(":id")
  async delete(@Param("id") commentId: string, @getUser() user: User) {
    return this.commentsService.delete(Number(commentId), user);
  }
}
