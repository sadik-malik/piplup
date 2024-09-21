# @piplup/react-acl

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/react-acl)

A lightweight React library for managing access control lists (ACL) in your application.

## Installation

You can install `@piplup/react-acl` using:

```bash
npm install @piplup/react-acl

# or

yarn add @piplup/react-acl

# or

pnpm add @piplup/react-acl
```

## Usage

### AclProvider

`AclProvider` is a component that needs to be placed at the top of your component tree to provide access control functionality to child components. It takes the following props:

- `loading`: A boolean indicating whether the ACL data is still loading.
- `permissions`: An array of strings or numbers representing permissions.
- `roles`: An array of strings or numbers representing roles.
- `children`: React node(s) that will be wrapped by the `AclProvider`.

```jsx
import { AclProvider } from '@piplup/react-acl';

<AclProvider loading={false} permissions={['read', 'write']} roles={['admin']}>
  {/* Your application components */}
</AclProvider>;
```

### HasAccess

`HasAccess` is a component that renders its children only if the user's specified permissions and roles match those provided in the AclProvider. It takes the following props:

- `children`: React node(s) to be rendered if the user has access.
- `loading`: (optional) React node to be rendered while ACL data is loading.
- `permissions`: (optional) An array of strings representing required permissions.
- `roles`: (optional) An array of strings representing required roles.
- `validationMode`: (optional) An object to customize how roles and permissions are validated:
  - `roles`: `'all'` | `'any'` (default: `'any'`)
  - `permissions`: `'all'` | `'any'` (default: `'any'`)
- `fallback`: (optional) React node(s) to be rendered if the user does not have access.

```jsx
import { HasAccess } from '@piplup/react-acl';

<HasAccess
  permissions={['read']}
  roles={['admin']}
  validationMode={{ roles: 'any', permissions: 'all' }}
  loading={<LoadingSpinner />}
  fallback={<AccessDenied />}
>
  {/* Content accessible by users with 'read' permission and 'admin' role */}
</HasAccess>;
```

### useAcl

`useAcl` is a custom hook that provides access to the ACL context.

Here's a breakdown of what `useAcl` returns:

- **isAuthorized**: A function that checks whether the current user is authorized based on the provided permissions and roles. It takes an object with two optional properties:

  - `permissions`: (optional) An array of strings or numbers representing permissions to check. If not provided, the function defaults to `true`, meaning it does not check permissions.
  - `roles`: (optional) An array of strings or numbers representing roles to check. If not provided, the function defaults to `true`, meaning it does not check roles.
  - `validationMode`: (optional) An object to customize how roles and permissions are validated:
    - `roles`: `'all'` | `'any'` (default: `'any'`)
    - `permissions`: `'all'` | `'any'` (default: `'any'`)

  It returns a boolean value indicating whether the user is authorized.

```jsx
import { useAcl } from '@piplup/react-acl';

const { isAuthorized, loading } = useAcl();
```

## Example

```jsx
import React from 'react';
import { AclProvider, HasAccess } from '@piplup/react-acl';

function App() {
  return (
    <AclProvider loading={false} permissions={['read']} roles={['admin']}>
      <HasAccess
        permissions={['read']}
        roles={['admin']}
        validationMode={{ roles: 'any', permissions: 'all' }}
        loading={<LoadingSpinner />}
        fallback={<AccessDenied />}
      >
        <Dashboard />
      </HasAccess>
    </AclProvider>
  );
}

export default App;
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
