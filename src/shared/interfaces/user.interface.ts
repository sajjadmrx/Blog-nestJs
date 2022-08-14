import { Prisma, User as _User } from "@prisma/client";

export interface User extends _User {}

export type UserCreateInput = Prisma.UserCreateInput; // Omit<Prisma.UserCreateInput>;

export type UserUpdateInput = Prisma.UserUpdateInput;
