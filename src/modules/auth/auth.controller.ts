import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "src/modules/auth/model/signin.dto";
import { AuthService } from "./auth.service";


@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('signup')
  async signup(@Body() body: SignInDto): Promise<Object> {
    return await this.authService.signUp(body);
  }


}