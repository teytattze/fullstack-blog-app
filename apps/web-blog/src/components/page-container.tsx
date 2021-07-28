import { Box } from '@material-ui/core';
import { PageTitle } from './page-title';

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
};

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <>
      <PageTitle title={title} />
      <Box sx={{ mt: 5 }}>{children}</Box>
    </>
  );
}
