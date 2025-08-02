import { CircularProgress } from '@mui/material';
import { AclProvider, HasAccess } from '@piplup/react-acl';
import { type Meta, type StoryObj } from '@storybook/react-vite';

/**
 * AclProvider is a component that needs to be placed at the top of your component tree to provide access control functionality to child components.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { AclProvider } from '@piplup/react-acl';
 * ```
 */
const meta: Meta<typeof AclProvider> = {
  args: {},
  argTypes: {},
  component: AclProvider,
  tags: ['autodocs'],
  title: 'React ACL/AclProvider',
};

export default meta;

type Story = StoryObj<typeof AclProvider>;

export const BasicUsage: Story = {
  args: {
    loading: false,
    permissions: ['read', 'write'],
    roles: ['admin'],
  },
  argTypes: {
    loading: {
      control: 'boolean',
    },
    permissions: {
      control: 'object',
    },
    roles: {
      control: 'object',
    },
  },
  render(props) {
    const { loading, permissions, roles } = props;
    return (
      <AclProvider loading={loading} permissions={permissions} roles={roles}>
        <HasAccess
          fallback={
            <p>
              Access denied, users needs to have <strong>read</strong> permission and{' '}
              <strong>admin</strong> role
            </p>
          }
          loading={<CircularProgress />}
          permissions={['read']}
          roles={['admin']}
        >
          <p>
            Content accessible by users with <strong>read</strong> permission and{' '}
            <strong>admin</strong> role
          </p>
        </HasAccess>
        <HasAccess
          fallback={
            <p>
              Access denied, users needs to have <strong>write</strong> permission and{' '}
              <strong>admin</strong> role
            </p>
          }
          loading={<CircularProgress />}
          permissions={['write']}
          roles={['admin']}
        >
          <p>
            Content accessible by users with <strong>write</strong> permission and{' '}
            <strong>admin</strong> role
          </p>
        </HasAccess>
      </AclProvider>
    );
  },
};
