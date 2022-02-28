import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserEntity } from './model/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [],
  providers: [
    UserService
  ],
  exports: [
    UserService,

  ],
})
export class UserModule { }