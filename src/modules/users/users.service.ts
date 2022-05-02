import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { IUser } from "src/common/interfaces/user.interface";
import { UsersRepository } from "./users.repository";



@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository
  ) { }

  getProfile(user: IUser): IUser {
    const myUser = user
    delete myUser.password
    return myUser
  }

  async updateRole(userId: number, role: string) {
    try {
      const hasRole = Role[role]
      if (!hasRole)
        throw new BadRequestException(`${role} is not a valid role`)

      const result = await this.userRepo.update(userId, {
        role: hasRole
      })
      return true // TODO: create Response OBject For All Successful Operations
    } catch (error) {
      throw new BadRequestException("INVALID_USER_ID")
    }
  }

}