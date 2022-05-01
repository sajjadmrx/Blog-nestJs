import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { getUser } from "src/common/decorators/req-user.decorator";
import { IUser } from "src/common/interfaces/user.interface";
import { UserService } from "./user.service";


@ApiBearerAuth('jwt')
@ApiTags("Current User")
@UseGuards(AuthGuard('jwt')) // set up auth guard for all routes
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  profile(@getUser<IUser>() user: IUser): IUser {
    return user
  }

}