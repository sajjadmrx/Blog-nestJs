import { Post, Prisma, } from "@prisma/client";

export interface IPost extends Post { }

export interface IPostCreateInput extends Prisma.PostCreateInput { }

export interface IPostUpdateInput extends Prisma.PostUpdateInput { }