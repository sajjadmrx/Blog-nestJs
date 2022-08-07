import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';


@Module({
  imports: [

  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    UsersRepository,
  ],
  exports: [
    UsersService,
    UsersRepository
  ],
})
export class UserModule { }