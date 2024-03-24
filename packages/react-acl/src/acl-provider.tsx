'use client';

import * as React from 'react';
import { AclContext, type AclContextType } from './acl-context';

export type AclProviderProps = {
  children: React.ReactNode;
  loading: boolean;
  permissions: (string | number)[];
  roles: (string | number)[];
};

export function AclProvider(props: AclProviderProps) {
  const { children, loading, permissions: permissionsProp = [], roles: rolesProp = [] } = props;

  const isAuthorized = React.useCallback(
    ({
      permissions = [],
      roles = [],
    }: {
      permissions?: string | number | (string | number)[];
      roles?: string | number | (string | number)[];
    }): boolean => {
      if (loading) {
        return false;
      }

      const rolesArray = Array.isArray(roles) ? roles : [roles];
      const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

      const hasRole =
        rolesArray.length === 0
          ? true // If no roles are provided, then it means, do not check roles. So, passing true.
          : rolesArray.some((role) => rolesProp.some((roleProp) => roleProp === role));
      const hasPermission =
        permissionsArray.length === 0
          ? true // If no permissions are provided, then it means, do not check permission. So, passing true.
          : permissionsArray.some((permission) =>
              permissionsProp.some((permissionProp) => permissionProp === permission)
            );

      if (hasRole && hasPermission) {
        return true;
      }
      return false;
    },
    [loading, permissionsProp, rolesProp]
  );

  const contextValue = React.useMemo<AclContextType>(
    () => ({
      isAuthorized,
      loading: loading ?? false,
    }),
    [loading, isAuthorized]
  );

  return <AclContext.Provider value={contextValue}>{children}</AclContext.Provider>;
}
