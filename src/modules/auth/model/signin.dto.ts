import { IsEmail, IsNotEmpty } from 'class-validator';
//* DTO (Data Transfer Object)
export class SignInDto {

  @IsNotEmpty()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  password?: string;
}