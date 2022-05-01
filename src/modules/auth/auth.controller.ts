import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignInDto } from "src/modules/auth/dtos/signin.dto";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dtos/signup.dto";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }


  @Post('signup')
  async signup(@Body() body: SignUpDto): Promise<Object> {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDto): Promise<Object> {
    return await this.authService.signIn(body);
  }

}