export interface IPost {
  id?: number;
  title: string;
  content: string;
  authorId: number;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}