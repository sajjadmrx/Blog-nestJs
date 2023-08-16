import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInDto } from "src/modules/auth/dtos/signin.dto";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dtos/signup.dto";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";

@ApiTags("Auth")
@UseInterceptors(ResponseInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "signup",
  })
  @Post("signup")
  async signup(@Body() body: SignUpDto): Promise<Object> {
    return await this.authService.signUp(body);
  }

  @ApiOperation({
    summary: "signing",
  })
  @Post("signing")
  @HttpCode(200)
  async signing(@Body() body: SignInDto): Promise<Object> {
    return await this.authService.signIn(body);
  }
}
