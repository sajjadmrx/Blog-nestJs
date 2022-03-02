import { IPost } from 'src/common/interfaces/post.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('posts')
export class PostEntity implements IPost {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  //# Todo: Add Cover Image

  @Column()
  authorId: number;

  @Column({ default: false })
  isPublished: boolean;

  // createdAt:Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // updatedAt:Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}
