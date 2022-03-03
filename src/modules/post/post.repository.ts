import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPost } from 'src/common/interfaces/post.interface';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { Repository } from 'typeorm';
import { PostEntity } from './model/post.entity';



@Injectable()
export class PostRepository implements IRepository<IPost>{
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>
  ) { }


  async find(page: number, limit: number): Promise<IPost[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit
    })
  }
  async findById(id: number): Promise<IPost> {
    return this.repository.findOne({ id: id });
  }

  async findByTitle(title: string): Promise<IPost> {
    return this.repository.findOne({ title: title });
  }


  async create(entity: IPost): Promise<IPost> {
    return this.repository.save(entity);
  }


  async update(id: number, entity: IPost): Promise<IPost> {
    return entity;
  }


  async deleteById(id: number) {
    return this.repository.delete({ id: id });
  }




}