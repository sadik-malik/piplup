import { CircularProgress } from '@mui/material';
import { AclProvider, HasAccess } from '@piplup/react-acl';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * HasAccess is a component that renders its children only if the user's specified permissions and roles match those provided in the AclProvider.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { HasAccess } from '@piplup/react-acl';
 * ```
 */
const meta: Meta<typeof HasAccess> = {
  args: {},
  argTypes: {},
  component: HasAccess,
  decorators(Story) {
    return (
      <AclProvider loading={false} permissions={['read', 'write']} roles={['admin']}>
        <Story />
      </AclProvider>
    );
  },
  tags: ['autodocs'],
  title: 'React ACL/Components/HasAccess',
};

export default meta;

type Story = StoryObj<typeof HasAccess>;

export const BasicUsage: Story = {
  args: {
    fallback: (
      <p>
        Access denied, users needs to have <strong>read</strong> permission and{' '}
        <strong>admin</strong> role
      </p>
    ),
    loading: <CircularProgress />,
    permissions: ['read', 'write'],
    roles: ['admin'],
    validationMode: {
      permissions: 'any',
      roles: 'any',
    },
  },
  argTypes: {
    validationMode: {
      control: 'object',
      table: {
        defaultValue: {
          summary: '{permissions: any, roles: any}',
        },
      },
    },
  },
  render(props) {
    const { fallback, loading, permissions, roles, validationMode } = props;

    return (
      <HasAccess
        fallback={fallback}
        loading={loading}
        permissions={permissions}
        roles={roles}
        validationMode={validationMode}
      >
        <p>
          Content accessible by users with <strong>read</strong> permission and{' '}
          <strong>admin</strong> role
        </p>
      </HasAccess>
    );
  },
};
