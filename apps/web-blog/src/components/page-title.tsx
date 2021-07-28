import { Typography } from '@material-ui/core';

type PageTitleProps = {
  title: string;
};

export function PageTitle({ title }: PageTitleProps) {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 'bold',
        borderLeft: '5px solid',
        borderColor: 'primary.main',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        px: 2,
      }}
    >
      {title}
    </Typography>
  );
}
