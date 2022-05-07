import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePostDto {


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the post',
    example: 'My first post',
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Content of the post',
    example: 'This is my first post',
    required: true,
  })
  content: string;


  @ApiProperty({
    description: 'Cover image of the post',
    example: 'googlelogo_color_272x92dp.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  cover: string;

  @ApiProperty({
    description: 'Published of the post',
    example: true,
    required: true
  })
  @IsBoolean()
  published: boolean
}