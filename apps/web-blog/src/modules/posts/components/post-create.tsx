import {
  Button,
  Box,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper } from 'src/components';
import { useAuth } from 'src/shared/hooks/use-auth';
import { ICreatePostValue } from 'src/shared/interfaces/posts.interface';
import { createPostValidation, defaultCreatePostValue } from '../posts.form';
import { useCreatePost } from '../posts.queries';

export function PostCreate() {
  const { user } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreatePostValue>();
  const { mutate: createPost, isLoading } = useCreatePost();

  return (
    <LoadingWrapper loading={isLoading}>
      <form
        onSubmit={handleSubmit((data) =>
          createPost(
            { ...data, authorId: user.id },
            {
              onSuccess: () => {
                reset(defaultCreatePostValue);
              },
              onError: (err) => {
                console.log(err.response);
              },
            },
          ),
        )}
      >
        <Stack spacing={2.5} sx={{ mt: 7.5 }}>
          <Controller
            name="title"
            control={control}
            defaultValue={defaultCreatePostValue.title}
            rules={createPostValidation.title}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                helperText={errors.title?.message}
                error={Boolean(errors.title)}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue={defaultCreatePostValue.content}
            rules={createPostValidation.content}
            render={({ field }) => (
              <TextField
                {...field}
                label="Content"
                variant="outlined"
                rows={10}
                multiline
                helperText={errors.content?.message}
                error={Boolean(errors.content)}
              />
            )}
          />
          <Controller
            name="published"
            control={control}
            defaultValue={defaultCreatePostValue.published}
            rules={createPostValidation.published}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} />}
                label="Publish"
              />
            )}
          />
        </Stack>
        <Box sx={{ mt: 7.5, textAlign: 'center' }}>
          <Button type="submit" variant="contained" disableElevation>
            Submit
          </Button>
        </Box>
      </form>
    </LoadingWrapper>
  );
}
