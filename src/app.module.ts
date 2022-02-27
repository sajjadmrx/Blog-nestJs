import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }