export interface IPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
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
