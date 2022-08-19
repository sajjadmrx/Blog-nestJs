import { Post as _Post, Prisma } from "@prisma/client";

export interface Post extends _Post {}

export interface PostCreateInput
  extends Omit<Prisma.PostCreateInput, "author"> {
  authorId: number;
}

export interface PostUpdateInput extends Partial<PostCreateInput> {}
