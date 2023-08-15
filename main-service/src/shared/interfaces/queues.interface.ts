import { User } from "./user.interface";

export interface welcomeEmailQueue {
  user: User;
}

export interface deleteFileQueue {
  filename: string;
  filePath: string;
  isFolder: boolean;
}

export interface ReSizeFileQueue {
  filePath: string;
  width: number;
  height: number;
}
