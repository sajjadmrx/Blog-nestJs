import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentCreateDto {
  @ApiProperty({
    type: String,
    required: true,
    name: "text",
    description: "content of comment",
    default: "Nice",
  })
  @IsString()
  text: string;

  @ApiProperty({
    name: "postId",
    required: true,
    type: Number,
  })
  @IsNumber()
  postId: number;

  @ApiProperty({
    type: Number,
    required: false,
    name: "replyId",
    description: "reply to a comment",
  })
  @IsNumber()
  @IsOptional()
  replyId?: number;
}
