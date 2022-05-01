import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/common/decorators/req-user.decorator";
import { IUser } from "src/common/interfaces/user.interface";
import { UserService } from "./user.service";


@UseGuards(AuthGuard('jwt')) // set up auth guard for all routes
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  profile(@getUser<IUser>() user: IUser): IUser {
    return user
  }

}