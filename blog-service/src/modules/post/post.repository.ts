import { Injectable } from "@nestjs/common";
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
} from "src/shared/interfaces/post.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async findPublic(
    page: number,
    limit: number,
    query: any = {}
  ): Promise<Post[]> {
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
            updatedAt: true,
          },
        },
        categories: {
          select: {
            postId: false,
            categoryId: false,
            assignedAt: false,
            category: {
              select: {
                id: true,
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
        categories: {
          select: {
            postId: false,
            categoryId: false,
            assignedAt: false,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
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

  async update(id: number, data: PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
