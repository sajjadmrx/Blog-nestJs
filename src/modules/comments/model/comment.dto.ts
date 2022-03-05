import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';


export class CommentDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  content: string;

  parentId: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}