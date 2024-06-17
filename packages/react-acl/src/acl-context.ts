import * as React from 'react';

export type AclContextType = {
  isAuthorized: ({
    permissions,
    roles,
  }: {
    permissions?: string | number | (string | number)[];
    roles?: string | number | (string | number)[];
    validationMode?: {
      roles?: 'all' | 'any';
      permissions?: 'all' | 'any';
    };
  }) => boolean;
  loading: boolean;
};

export const AclContext = React.createContext<AclContextType | null>(null);
