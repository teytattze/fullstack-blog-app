import { Skeleton, Stack, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import { LoadingWrapper } from 'src/components';
import { useIndexPosts } from '../posts.queries';

export function PostListing() {
  const { data, isLoading } = useIndexPosts({ published: true });

  return (
    <LoadingWrapper
      loading={isLoading}
      type="skeleton"
      renderSkeleton={() => (
        <Stack direction="column" spacing={2}>
          <Skeleton variant="rectangular" height={24} />
          <Skeleton variant="rectangular" height={24} />
          <Skeleton variant="rectangular" height={188} />
        </Stack>
      )}
    >
      {data?.length ? (
        <Stack direction="column" spacing={4}>
          {data.map((post) => (
            <PostItem
              key={post.id}
              postId={post.id}
              username={post.author.username}
              title={post.title}
              content={post.content}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Sorry...published post is not available yet!
        </Typography>
      )}
    </LoadingWrapper>
  );
}

export type PostItemProps = {
  postId: string;
  username: string;
  title: string;
  content: string;
};

export function PostItem({ postId, username, title, content }: PostItemProps) {
  return (
    <NextLink href={`posts/${postId}`}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          p: { xs: 3, md: 5 },
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'all 0.4s ease-in-out',
          ':hover': {
            backgroundColor: 'background.paper',
            boxShadow: 5,
          },
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography
          variant="body2"
          sx={{
            lineHeight: '1.6',
            '&': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            },
          }}
        >
          {content}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          By: {username}
        </Typography>
      </Stack>
    </NextLink>
  );
}
