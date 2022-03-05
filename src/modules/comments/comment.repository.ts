import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IComment } from "src/common/interfaces/comment.interface";
import { IRepository } from "src/common/interfaces/repository.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CommentEntity } from "./model/comment.entity";

@Injectable()
export class CommentRepository implements IRepository<IComment> {
  constructor(
    @InjectRepository(CommentEntity) private repository: Repository<CommentEntity>
  ) { }


  async find(page: number, limit: number): Promise<IComment[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit
    })
  }
  findById(id: number): Promise<IComment> {
    return this.repository.findOne({ id: id });
  }
  create(entity: IComment): Promise<IComment> {
    return this.repository.save(entity);
  }
  update(id: number, entity: IComment): Promise<UpdateResult> {
    return this.repository.update({ id: id }, { ...entity });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }



}