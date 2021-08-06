import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuth } from 'src/shared/hooks/use-auth';

export type ProtectedRoutedProps = {
  children: React.ReactNode;
};

export function ProtectedRouted({ children }: ProtectedRoutedProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}
