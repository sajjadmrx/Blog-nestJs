import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
} from "src/shared/interfaces/post.interface";
import { PrismaService } from "../prisma/prisma.service";
import { BatchPayload } from "../../shared/interfaces/repository.interface";

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async findPublic(page: number, limit: number, query): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        ...query,
        published: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            createdAt: true,
            role: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            createdAt: true,
            role: true,
          },
        },
      },
    });
  }

  async countPublished(query): Promise<number> {
    return this.prisma.post.count({ where: { ...query, published: true } });
  }

  async create(post: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data: post });
  }

  async update(id: number, post: PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: post,
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
  async deleteCategoriesOnPost(postId: number): Promise<BatchPayload> {
    return this.prisma.categoriesOnPosts.deleteMany({
      where: { postId },
    });
  }
}
