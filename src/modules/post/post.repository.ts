import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { IPost, IPostCreateInput, IPostUpdateInput } from 'src/common/interfaces/post.interface';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class PostRepository {
  constructor(
    private prisma: PrismaService
  ) { }





  async find(): Promise<IPost[]> {
    return this.prisma.post.findMany();
  }

  async findById(id: number): Promise<IPost | null> {
    return this.prisma.post.findUnique({
      where: {
        id: id
      }
    })
  }

  async create(post: IPostCreateInput): Promise<IPost> {
    return this.prisma.post.create({ data: post })
  }


  async update(id: number, post: IPostUpdateInput): Promise<IPost> {
    return this.prisma.post.update({
      where: {
        id: id
      },
      data: post
    })
  }


}