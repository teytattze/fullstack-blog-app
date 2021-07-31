import * as React from 'react';
import { SnackbarContext } from 'src/contexts/snackbar.context';

export const useSnackbar = () => React.useContext(SnackbarContext);
