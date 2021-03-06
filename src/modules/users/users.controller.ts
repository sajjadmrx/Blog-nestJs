import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { getUser } from "src/shared/decorators/req-user.decorator";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { IUser } from "src/shared/interfaces/user.interface";
import { RoleDto } from "./dtos/role.dto";
import { UsersService } from "./users.service";


@UseGuards(AuthGuard('jwt')) // set up auth guard for all routes
@ApiBearerAuth()
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('/@me')
  @ApiTags("Current User")
  profile(@getUser<IUser>() user: IUser) {
    return this.usersService.getProfile(user)
  }


  @Put('/role/:userId')
  @ApiTags("Manage User")
  @UseGuards(CheckRoleGuard(['ADMIN']))
  updateRole(@Param('userId') userId: string, @Body() roleDto: RoleDto): Promise<any> {
    return this.usersService.updateRole(Number(userId), roleDto.name)
  }

}