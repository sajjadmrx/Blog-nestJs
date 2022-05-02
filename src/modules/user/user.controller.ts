import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { getUser } from "src/common/decorators/req-user.decorator";
import CheckRoleGuard from "src/common/guards/check-roles.guard";
import { IUser } from "src/common/interfaces/user.interface";
import { RoleDto } from "./dtos/role.dto";
import { UserService } from "./user.service";


@ApiBearerAuth('jwt')
@ApiTags("Current User")
@UseGuards(AuthGuard('jwt')) // set up auth guard for all routes
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  profile(@getUser<IUser>() user: IUser): IUser {
    return this.userService.getProfile(user)
  }


  @UseGuards(CheckRoleGuard(['ADMIN']))
  @Put('role')
  updateRole(@getUser<IUser>() user: IUser, @Body() role: RoleDto) {
    return this.userService.updateRole(user.id, role.name)
  }

}