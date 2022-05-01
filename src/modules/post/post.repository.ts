import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPost } from 'src/common/interfaces/post.interface';
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

  // async findByTitle(title: string): Promise<IPost> {
  //   return this.prisma.post.findUnique({
  //     where: {
  //       titl: title
  //     }
  //   })
  // }


  // async create(entity: IPost): Promise<IPost> {
  //   return this.prisma.post.create({

  //   })
  // }

  // async update(id: number, entity: IPost): Promise<UpdateResult> {
  //   return this.repository.update({ id: id }, {
  //     ...entity
  //   });
  // }



  // delete(id: number): Promise<DeleteResult> {
  //   return this.repository.delete({ id: id });
  // }




}