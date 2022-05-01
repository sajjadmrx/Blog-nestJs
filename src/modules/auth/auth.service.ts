import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";

import { SignInDto } from "./dtos/signin.dto";

import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dtos/signup.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
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

      return this.jwtSignUserId(userExist.id);
    } catch (error) {
      throw error
    }
  }


  jwtSignUserId(userId: number): object {
    return {
      access_token: this.jwtService.sign({ userId })
    }
  }




}