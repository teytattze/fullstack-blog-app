import * as React from 'react';
import {
  Button,
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { StackedBarChartRounded } from '@material-ui/icons';

export function PostDetails() {
  const [isEdit, setIsEdit] = React.useState(false);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: '100%',
          px: { md: 3 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isEdit ? (
            <IconButton onClick={handleEdit}>
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2.5 }}>
            This is the Title
          </Typography>
          {}
          <Chip
            label="Published"
            size="small"
            sx={{
              backgroundColor: 'success.light',
              fontFamily: 'fontTitle',
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
            28 June 2021
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
      </Stack>
      <Divider sx={{ my: 5 }} />
      <Typography
        variant="body1"
        sx={{ px: { md: 3 }, lineHeight: 1.75, textAlign: 'justify' }}
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
    </>
  );
}
