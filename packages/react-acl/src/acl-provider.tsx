import * as React from 'react';
import { AclContext, type AclContextType } from './acl-context';

export type AclProviderProps = {
  children: React.ReactNode;
  loading: boolean;
  permissions: (string | number)[];
  roles: (string | number)[];
};

function hasIntersection(value: unknown, array: unknown[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0 ? true : value.some((val) => array.some((item) => item === val));
  } else {
    return typeof value === 'undefined' ? true : array.some((item) => item === value);
  }
}

function hasUnion(value: unknown, array: unknown[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0 ? true : value.every((val) => array.some((item) => item === val));
  } else {
    return typeof value === 'undefined' ? true : array.some((item) => item === value);
  }
}

export function AclProvider(props: AclProviderProps) {
  const { children, loading, permissions: permissionsProp = [], roles: rolesProp = [] } = props;

  const isAuthorized = React.useCallback(
    ({
      permissions = [],
      roles = [],
      validationMode = {
        roles: 'any',
        permissions: 'any',
      },
    }: {
      permissions?: string | number | (string | number)[];
      roles?: string | number | (string | number)[];
      validationMode?: {
        roles?: 'all' | 'any';
        permissions?: 'all' | 'any';
      };
    }): boolean => {
      if (loading) {
        return false;
      }

      const hasRole: boolean =
        validationMode.roles === 'all'
          ? hasUnion(roles, rolesProp)
          : hasIntersection(roles, rolesProp);
      const hasPermission: boolean =
        validationMode.permissions === 'all'
          ? hasUnion(permissions, permissionsProp)
          : hasIntersection(permissions, permissionsProp);

      return hasRole && hasPermission;
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
