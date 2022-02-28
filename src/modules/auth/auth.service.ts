import { Injectable, BadRequestException } from "@nestjs/common";
import { UserEntity } from "../user/model/user.entity";
import { UserService } from "../user/user.service";
import { SignInDto } from "./model/signin.dto";

import * as bcrypt from "bcrypt";
import { SignUpDto } from "./model/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) { }


  async signUp(user: SignUpDto) {


    const usersExist = await this.userService.findByEmailOrUsername(user.email, user.username);
    if (usersExist.length > 0)
      throw new BadRequestException("Email or username already exist");

    let newUser = {
      ...user,
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    return this.userService.create(newUser as UserEntity);

  }





}