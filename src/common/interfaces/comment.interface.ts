export interface IComment {
  id?: number;
  content: string;
  isParent?: boolean;
  parentId?: number;
  userId: number;
  postId: number;
  // isSpoiled: boolean; #TODO: add spoiled comment feature
  createdAt?: Date;
  updatedAt?: Date;
}