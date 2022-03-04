import { IComment } from "src/common/interfaces/comment.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class CommentEntity implements IComment {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  content: string;


  @Column({ default: false })
  isParent: boolean;

  @Column({ default: 0 })
  parentId?: number;
  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

}