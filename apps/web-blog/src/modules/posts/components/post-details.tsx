import * as React from 'react';
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useRouter } from 'next/router';
import { HasPermission } from 'src/modules/auth';
import { useGetPost } from '../posts.queries';
import { LoadingWrapper } from 'src/components';

export function PostDetails() {
  const router = useRouter();
  const { data, isLoading } = useGetPost(router.query.postId as string);

  const [isEdit, setIsEdit] = React.useState(false);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

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
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: '100%',
          px: { md: 3 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <HasPermission>
            {isEdit ? (
              <IconButton onClick={handleEdit}>
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            )}
          </HasPermission>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2.5 }}>
            {data?.title}
          </Typography>
          <Chip
            label={data?.published ? 'Published' : 'Archived'}
            color={data?.published ? 'success' : 'info'}
            size="small"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          />
        </Stack>
        <Stack direction="column">
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {moment(data?.updatedAt).format('DD MMMM YYYY')}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            By: {data?.author.username}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 5 }} />
      <Typography
        variant="body1"
        sx={{ px: { md: 3 }, lineHeight: 1.75, textAlign: 'justify' }}
      >
        {data?.content}
      </Typography>
      <HasPermission>
        {isEdit && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 10 }}
          >
            <Button color="error">Delete</Button>
            <Button variant="contained" disableElevation>
              Archive
            </Button>
          </Stack>
        )}
      </HasPermission>
    </LoadingWrapper>
  );
}
