import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreatePostDto {


  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

}