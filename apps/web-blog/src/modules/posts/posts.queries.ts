import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { AjaxError } from 'src/lib/ajax';
import {
  createPost,
  deletePost,
  getPost,
  indexPosts,
  updatePost,
} from 'src/services/api-posts.service';
import {
  ICreatePostValue,
  IIndexPostFilter,
  IPost,
  IPostWithAuthor,
  IUpdatePostValue,
} from 'src/shared/interfaces/posts.interface';

const PostQueryKey = {
  INDEX_POSTS: 'INDEX_POSTS',
  GET_POST: 'GET_POST',
};

export const useIndexPosts = (
  filter?: IIndexPostFilter,
  options?: UseQueryOptions<IPostWithAuthor[], AjaxError, IPostWithAuthor[]>,
) => {
  return useQuery<IPostWithAuthor[], AjaxError, IPostWithAuthor[]>(
    PostQueryKey.INDEX_POSTS,
    () => indexPosts({ ...filter }),
    {
      ...options,
    },
  );
};

export const useGetPost = (
  postId: string,
  options?: UseQueryOptions<IPostWithAuthor, AjaxError>,
) => {
  return useQuery<IPostWithAuthor, AjaxError, IPostWithAuthor>(
    [PostQueryKey.GET_POST, postId],
    () => getPost(postId),
    {
      ...options,
    },
  );
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<IPost, AjaxError, ICreatePostValue>(
    (data: ICreatePostValue) => createPost(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PostQueryKey.INDEX_POSTS]);
      },
    },
  );
};

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    IPost,
    AjaxError,
    { postId: string; data: IUpdatePostValue }
  >(
    ({ postId, data }: { postId: string; data: IUpdatePostValue }) =>
      updatePost(postId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PostQueryKey.GET_POST, postId]);
      },
    },
  );
};

export const useDeletePost = () => {
  return useMutation<IPost, AjaxError, string>((postId: string) =>
    deletePost(postId),
  );
};
