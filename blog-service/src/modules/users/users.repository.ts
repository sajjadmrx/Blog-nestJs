import { Injectable } from "@nestjs/common";

import {
  User,
  UserCreateInput,
  UserUpdateInput,
} from "src/shared/interfaces/user.interface";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany({
      ...params,
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmailAndUsername(
    email: string,
    username: string
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async create(user: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  async update(id: number, entity: UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id: id }, data: entity });
  }
  async deleteOneWithId(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: id } });
  }
  // async delete(id: number): Promise<void> {
  //   return this.repository.delete(id)
  // }
}
