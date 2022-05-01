import { Prisma, User } from "@prisma/client";

export interface IUser extends User {

}


export type UserCreateInput = Prisma.UserCreateInput // Omit<Prisma.UserCreateInput>;

export type UserUpdateInput = Prisma.UserUpdateInput