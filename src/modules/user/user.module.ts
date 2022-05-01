import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';


@Module({
  imports: [

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