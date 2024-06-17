import * as React from 'react';
import { useAcl } from './use-acl';

export type HasAccessProps = {
  children: React.ReactNode;
  loading?: React.ReactNode;
  permissions?: string[];
  fallback?: React.ReactNode;
  roles?: string[];
  validationMode?: {
    roles?: 'all' | 'any';
    permissions?: 'all' | 'any';
  };
};

export function HasAccess(props: HasAccessProps): React.ReactElement {
  const { children, loading = null, permissions, fallback = null, roles, validationMode } = props;

  const acl = useAcl();

  if (acl.loading) {
    return <>{loading}</>;
  }

  if (!acl.isAuthorized({ permissions, roles, validationMode })) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
