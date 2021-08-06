import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import moment from 'moment';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'src/shared/hooks/use-auth';
import { useIndexPosts } from 'src/modules/posts/posts.queries';
import { LoadingWrapper } from 'src/components';
import { useMediaQuery } from '@material-ui/core';

export function UserPostsListing() {
  const { user } = useAuth();
  const { data, isLoading } = useIndexPosts({ userId: user.id });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [postStatus, setPostStatus] = React.useState('all');

  const handleSearchTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePostStatus = (event: SelectChangeEvent) => {
    setPostStatus(event.target.value);
  };

  return (
    <Stack direction="column" spacing={8}>
      <FilterBar
        searchTerm={searchTerm}
        postStatus={postStatus}
        handleSearchTerms={handleSearchTerms}
        handlePostStatus={handlePostStatus}
      />
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
        <Stack direction="column" spacing={4}>
          {data
            ?.filter((post) => {
              switch (postStatus) {
                case 'all':
                  return true;
                case 'published':
                  return post.published;
                case 'archived':
                  return !post.published;
                default:
                  return true;
              }
            })
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((post) => (
              <PostItem
                key={post.id}
                postId={post.id}
                published={post.published}
                title={post.title}
                content={post.content}
                updatedAt={post.updatedAt}
              />
            ))}
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}

type FilterBarProps = {
  handleSearchTerms: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostStatus: (event: SelectChangeEvent) => void;
  postStatus: string;
  searchTerm: string;
};

export function FilterBar({
  handleSearchTerms,
  handlePostStatus,
  postStatus,
  searchTerm,
}: FilterBarProps) {
  const theme = useTheme();
  const isDefault = useMediaQuery(theme.breakpoints.up('sm'));

  const { push } = useRouter();

  return (
    <Stack
      direction={isDefault ? 'row' : 'column'}
      alignItems="center"
      justifyContent={isDefault ? 'space-between' : 'justify-start'}
      spacing={4}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={isDefault ? 2 : 1}
        sx={{ width: '100%', flex: 1 }}
      >
        <IconButton
          edge="start"
          onClick={() =>
            push(`${process.env.NEXT_PUBLIC_BASE_URL}/create-post`)
          }
        >
          <AddIcon />
        </IconButton>
        <TextField
          sx={{ flex: 1 }}
          name="search"
          placeholder="Search..."
          variant="standard"
          value={searchTerm}
          onChange={handleSearchTerms}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <FormControl sx={{ width: { xs: '100%', sm: '200px' } }}>
        <Select value={postStatus} onChange={handlePostStatus}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export type PostItemProps = {
  postId: string;
  published: boolean;
  title: string;
  content: string;
  updatedAt: string;
};

export function PostItem({
  postId,
  published,
  title,
  content,
  updatedAt,
}: PostItemProps) {
  return (
    <NextLink href={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`}>
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
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <Chip label={published ? 'Published' : 'Archived'} size="small" />
        </Stack>
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
          Last update: {moment(updatedAt).format('DD MMMM YYYY')}
        </Typography>
      </Stack>
    </NextLink>
  );
}
