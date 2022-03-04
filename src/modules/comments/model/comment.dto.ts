import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';


export class CommentDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  content: string;

  parentId: string;

}