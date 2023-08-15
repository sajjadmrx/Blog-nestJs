import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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


  @ApiProperty({
    description: 'category of the post',
    example: [1],
    required: true,
    maxItems: 3,
    minItems: 1,
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsArray()
  categories: number[];


  @ApiProperty({
    description: 'Tags of the post',
    example: ['tag1', 'tag2'],
    required: true
  })
  tags: string[];
}