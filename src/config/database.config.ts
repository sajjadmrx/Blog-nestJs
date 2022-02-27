import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestjs-Blog',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false, //@ TODO: Read Docs about this
  logging: true,
}