export interface IPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPostWithAuthor extends IPost {
  author: {
    username: string;
  };
}

export interface ICreatePostValue {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export interface IUpdatePostValue {
  title?: string;
  content?: string;
  published?: boolean;
}
