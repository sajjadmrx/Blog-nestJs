import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';


import { DATABASE_CONFIG } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }