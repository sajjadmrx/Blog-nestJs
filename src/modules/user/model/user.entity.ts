import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;


  @Column({ unique: true })
  username: string;


  @Column({ unique: true })
  email: string;


  @Column({ select: false })
  password: string;

}