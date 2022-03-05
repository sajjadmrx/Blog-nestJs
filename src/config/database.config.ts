import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestjs-Blog',
  entities: ["dist/**/*.entity.js"],
  synchronize: false, //* Auto create table
  logging: false,
  migrationsRun: true
}