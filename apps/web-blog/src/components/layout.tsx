import * as React from 'react';
import { Container } from '@material-ui/core';
import { Navbar } from '../modules/navigation';
import { useAuth } from 'src/shared/hooks/use-auth';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth();

  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <Container maxWidth="xl" sx={{ mt: 15, mb: { xs: 12, md: 5 } }}>
            {children}
          </Container>
        </>
      )}
    </>
  );
}
