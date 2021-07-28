import {
  Button,
  Box,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@material-ui/core';

export function PostCreate() {
  return (
    <>
      <Stack spacing={2.5} sx={{ mt: 7.5 }}>
        <TextField variant="outlined" label="Title" />
        <TextField variant="outlined" label="Content" rows={10} multiline />
        <FormControlLabel control={<Switch defaultChecked />} label="Publish" />
      </Stack>
      <Box sx={{ mt: 7.5, textAlign: 'center' }}>
        <Button variant="contained" disableElevation>
          Submit
        </Button>
      </Box>
    </>
  );
}
