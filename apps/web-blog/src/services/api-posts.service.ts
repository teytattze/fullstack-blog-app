import { ajax, apiClientWithoutAuth } from 'src/lib/ajax';
import { transformFilter } from 'src/lib/utils';
import {
  ICreatePostValue,
  IIndexPostFilter,
  IPost,
  IPostWithAuthor,
  IUpdatePostValue,
} from 'src/shared/interfaces/posts.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/posts`;

export const indexPosts = async (
  filter: IIndexPostFilter,
): Promise<IPostWithAuthor[]> => {
  const queryParams = transformFilter(filter);
  const res = await apiClientWithoutAuth.get(`${baseUrl}?${queryParams}`);
  return res.data;
};

export const getPost = async (postId: string): Promise<IPostWithAuthor> => {
  const res = await apiClientWithoutAuth.get(`${baseUrl}/${postId}`);
  return res.data;
};

export const createPost = async (data: ICreatePostValue) =>
  await ajax.post<IPost>(`${baseUrl}/create`, data);

export const updatePost = async (postId: string, data: IUpdatePostValue) =>
  await ajax.patch<IPost>(`${baseUrl}/${postId}/update`, data);

export const deletePost = async (postId: string) =>
  await ajax.delete<IPost>(`${baseUrl}/${postId}/delete`);
