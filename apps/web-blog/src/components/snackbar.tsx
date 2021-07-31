import * as React from 'react';
import {
  Alert as MuiAlert,
  AlertProps,
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
} from '@material-ui/core';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'open'> {
  open: boolean;
  handleClose: () => void;
  severity: AlertProps['severity'];
  message: string;
}

export function Snackbar({
  open,
  handleClose,
  severity,
  message,
  ...props
}: SnackbarProps) {
  return (
    <MuiSnackbar open={open} onClose={handleClose} {...props}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
