import * as React from 'react';
import { Snackbar, SnackbarProps } from 'src/components';

export type SnackbarContextState = {
  enqueueSnackbar: (
    message: SnackbarProps['message'],
    severity: SnackbarProps['severity'],
  ) => void;
  handleClose: () => void;
};

export const SnackbarContext = React.createContext<SnackbarContextState>({
  enqueueSnackbar: () => null,
  handleClose: () => null,
});

export type SnackbarProviderProps = {
  children: React.ReactNode;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = React.useState<Omit<
    SnackbarProps,
    'open' | 'handleClose'
  > | null>(null);

  const enqueueSnackbar = (
    message: SnackbarProps['message'],
    severity: SnackbarProps['severity'],
  ) => {
    setSnackbar({ message, severity });
  };

  const handleClose = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, handleClose }}>
      {children}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          severity={snackbar.severity}
          handleClose={handleClose}
          open={Boolean(snackbar)}
        />
      )}
    </SnackbarContext.Provider>
  );
}
