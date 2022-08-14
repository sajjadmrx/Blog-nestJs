import { Post as _Post, Prisma } from "@prisma/client";

export interface Post extends _Post {}

export interface PostCreateInput extends Prisma.PostCreateInput {}

export interface PostUpdateInput extends Prisma.PostUpdateInput {}
