import { IsNotEmpty, IsString, Min } from 'class-validator';


export class CommentDto {
  @Min(3)
  @IsString()
  @IsNotEmpty()
  content: string;

  parentId: string;

}