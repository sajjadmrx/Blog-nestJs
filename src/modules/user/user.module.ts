import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserEntity } from './model/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [
    UserService,
    UserRepository
  ],
})
export class UserModule { }