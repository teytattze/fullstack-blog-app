import * as React from 'react';
import { useAuth } from 'src/shared/hooks/use-auth';

export type HasPermissionProps = {
  children: React.ReactNode;
};

export function HasPermission({ children }: HasPermissionProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}
