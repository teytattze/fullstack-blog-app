import { Post } from '@prisma/client';

export interface IPost extends Post {
  author: {
    username: string;
  };
}
