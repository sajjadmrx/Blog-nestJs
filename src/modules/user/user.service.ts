import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { IUser } from "src/common/interfaces/user.interface";
import { UserRepository } from "./user.repository";



@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository
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

      await this.userRepo.update(userId, {
        role: hasRole
      })

      return true // TODO: create Response OBject For All Successful Operations
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

}