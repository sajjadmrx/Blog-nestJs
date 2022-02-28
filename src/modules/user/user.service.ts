import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "./model/user.entity";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

  ) { }


  async findAll(page: number = 1, limit: number = 10): Promise<UserEntity[]> {
    return this.userRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({ id })
  }

  async findOneByEmailAndUsername(email: string, username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email, username })
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ username })
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email })
  }

   async findByEmailOrUsername(email: string, username: string): Promise<UserEntity[]> {
    return this.userRepo.find({
      where: [
        { email },
        { username },
      ]
    })
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user)
  }

  // async update(id: number, user: UserEntity): Promise<UserEntity> { 
  //   return this.userRepo.update({id}, user)
  // }

}