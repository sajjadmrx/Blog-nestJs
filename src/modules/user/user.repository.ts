import { Injectable } from '@nestjs/common'
import { UserEntity } from './model/user.entity';

import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserRepository implements IRepository<IUser>{

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) { }



  async find(page: number = 1, limit: number = 10): Promise<IUser[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: number): Promise<IUser> {
    return this.repository.findOne({ id })
  }

  async findOneByEmailAndUsername(email: string, username: string): Promise<IUser> {
    return this.repository.findOne({ email, username })
  }

  async findOneByUsername(username: string): Promise<IUser> {
    return this.repository.findOne({ username })
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return this.repository.findOne({ email })
  }

  async findByEmailOrUsername(email: string, username: string): Promise<IUser[]> {
    return this.repository.find({
      where: [
        { email },
        { username },
      ]
    })
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user)
  }

  async update(id: number, entity: IUser): Promise<UpdateResult> {
    return this.repository.update({ id }, { ...entity })
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id })
  }
  // async delete(id: number): Promise<void> {
  //   return this.repository.delete(id)
  // }


}

