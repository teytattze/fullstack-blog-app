import { Stack, Typography } from '@material-ui/core';

export function PostListing() {
  return (
    <Stack direction="column" spacing={4}>
      <PostItem />
      <PostItem />
      <PostItem />
    </Stack>
  );
}

export function PostItem() {
  return (
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
      <Typography variant="h6">This is the Title</Typography>
      <Typography
        variant="body2"
        sx={{
          '&': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          },
        }}
      >
        Phasellus consequat, tortor vitae tempor gravida, lacus augue dignissim
        ante, ut faucibus leo ligula eget purus. Fusce sed turpis a quam
        lobortis scelerisque. Pellentesque consectetur arcu non velit bibendum
        iaculis. Sed egestas scelerisque ante a interdum. Curabitur ac lectus at
        nibh dignissim vestibulum. Vivamus a erat tristique, facilisis metus eu,
        consectetur dui. Praesent bibendum, nisl ac consectetur condimentum,
        justo leo pharetra sem, sit amet pulvinar enim ex nec elit. Etiam
        volutpat fermentum vulputate. Phasellus pulvinar massa sit amet dui
        condimentum congue. Mauris sodales tempor lorem, et gravida sapien
        vehicula a. Pellentesque eget eros vitae lorem elementum rhoncus ut ut
        libero. Duis tempor erat a faucibus sollicitudin. Duis nec gravida
        risus. Aliquam porttitor tristique quam interdum luctus. Suspendisse ut
        vulputate ligula. Sed rutrum venenatis urna ut consectetur. Nam arcu
        sapien, rhoncus eu eleifend vitae, tincidunt a orci. Pellentesque vitae
        fringilla turpis. Mauris aliquet pellentesque felis, ut ullamcorper
        magna tempus at. Donec lectus urna, semper quis ante eu, interdum
        tincidunt leo. Nulla sagittis eu magna ac viverra.
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        By: Tey Tat Tze
      </Typography>
    </Stack>
  );
}
