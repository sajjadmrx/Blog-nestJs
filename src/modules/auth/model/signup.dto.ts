import { Contains, IsEmail, IsNotEmpty, IsString } from 'class-validator';
//* DTO (Data Transfer Object)
export class SignUpDto {


  @IsString()
  @IsNotEmpty()
  username: string;

  //only Google
  @Contains('@gmail', {
    message: 'Email must be a gmail account'
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;


}