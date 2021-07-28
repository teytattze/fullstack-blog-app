import { createTheme } from '@material-ui/core/styles';
import breakpoints from './breakpoints.style';
import palette from './palette.style';
import typography from './typography.style';

const theme = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...palette },
  typography: { ...typography },
});

export default theme;
