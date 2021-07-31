import * as React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export type StyleProps = {
  loading: boolean;
};

const useStyles = makeStyles({
  root: (props: StyleProps) => ({
    pointerEvents: props.loading ? 'none' : 'auto',
    opacity: props.loading ? 0.74 : 1,
  }),
});

export type LoadingWrapperProps = {
  loading?: boolean;
  type?: 'skeleton' | 'disable';
  renderSkeleton?: () => React.ReactElement<any, any> | null;
  children: React.ReactNode;
};

export function LoadingWrapper({
  loading = false,
  type = 'disable',
  renderSkeleton,
  children,
}: LoadingWrapperProps) {
  const styleProps: StyleProps = { loading };
  const classes = useStyles(styleProps);

  if (type === 'skeleton' && renderSkeleton && loading) {
    return renderSkeleton();
  }

  return <Box className={classes.root}>{children}</Box>;
}
