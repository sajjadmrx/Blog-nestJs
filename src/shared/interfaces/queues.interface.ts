import { User } from "./user.interface";

export interface QueuesWelcomeEmailCreate {
  user: User;
}

export interface QueueDeleteFileCreate {
  filename: string;
  filePath: string;
  isFolder: boolean;
}
