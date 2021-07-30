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
  IPost,
  IUpdatePostValue,
} from 'src/shared/interfaces/posts.interface';

const PostQueryKey = {
  INDEX_POSTS: 'INDEX_POSTS',
  GET_POST: 'GET_POST',
};

export const useIndexPosts = (
  { isPublished }: { isPublished: boolean },
  options?: UseQueryOptions<IPost[], AjaxError, IPost[]>,
) => {
  return useQuery<IPost[], AjaxError, IPost[]>(
    PostQueryKey.INDEX_POSTS,
    () => indexPosts(isPublished),
    {
      ...options,
    },
  );
};

export const useGetPost = (
  postId: string,
  options?: UseQueryOptions<IPost, AjaxError>,
) => {
  return useQuery<IPost, AjaxError, IPost>(
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
