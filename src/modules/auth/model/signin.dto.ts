import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//* DTO (Data Transfer Object)
export class SignInDto {


  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;


}