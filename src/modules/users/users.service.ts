import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { IUser } from "src/common/interfaces/user.interface";
import { UsersRepository } from "./users.repository";
import { getResponseMessage } from '../../common/constants/messages.constant'
import { responseData } from "src/common/functions/response.func";


@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository
  ) { }

  getProfile(user: IUser) {
    const myUser = user
    delete myUser.password
    return responseData({
      statusCode: "OK",
      message: getResponseMessage("SUCCESS"),
      data: myUser
    })
  }

  async updateRole(userId: number, role: string) {
    try {
      const hasRole = Role[role]
      if (!hasRole)
        throw new BadRequestException(getResponseMessage("INVALID_ROLE"))

      await this.userRepo.update(userId, {
        role: hasRole
      })

      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
      })
    } catch (error) {
      throw new BadRequestException(getResponseMessage("INVALID_USER_ID"))
    }
  }

}