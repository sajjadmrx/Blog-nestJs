import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";

import { SignInDto } from "./dtos/signin.dto";

import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dtos/signup.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "../users/users.repository";
import { responseData } from "src/common/functions/response.func";
import { getResponseMessage } from "src/common/constants/messages.constant";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService
  ) { }


  async signUp(user: SignUpDto) {
    try {
      const usersExist = await this.userRepository.findByEmailOrUsername(user.email, user.username);
      if (usersExist.length > 0)
        throw new BadRequestException("Email or username already exist");

      let newUser = {
        ...user,
      }

      newUser.password = await bcrypt.hash(newUser.password, 10);

      const createdUser = await this.userRepository.create(newUser);



      return this.jwtSignUserId(createdUser.id);
    } catch (error) {
      throw error
    }
  }


  async signIn(user: SignInDto): Promise<object> {
    try {
      const userExist = await this.userRepository.findOneByUsername(user.username);
      if (!userExist)
        throw new UnauthorizedException('invalid credentials');

      const passwordIsMatch = await bcrypt.compare(user.password, userExist.password);
      if (!passwordIsMatch)
        throw new UnauthorizedException('invalid credentials');


      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: this.jwtSignUserId(userExist.id)
      })

    } catch (error) {
      throw error
    }
  }


  jwtSignUserId(userId: number): object {

    return responseData({
      statusCode: "OK",
      message: getResponseMessage("SUCCESS"),
      data: this.jwtService.sign({ userId })
    })

  }




}