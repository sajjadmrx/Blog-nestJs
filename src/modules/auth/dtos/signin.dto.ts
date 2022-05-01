import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//* DTO (Data Transfer Object)
export class SignInDto {


  @ApiProperty({
    description: 'The username of the user',
    required: true,
    type: String,
    example: 'sajjadmrx',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;


  @ApiProperty({
    description: 'The password of the user',
    required: true,
    type: String,
    example: '@armiow2516fds',

  })
  @IsString()
  @IsNotEmpty()
  password: string;


}