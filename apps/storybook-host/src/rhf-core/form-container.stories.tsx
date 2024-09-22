import { FormContainer, HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around react-hook-form `<FormProvider>` configured to work with adapters and component created by `@piplup/rhf-core` and `@piplup/rhf-adapters`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { FormContainer } from '@piplup/rhf-core';
 * ```
 */
const meta: Meta<typeof FormContainer> = {
  args: {},
  argTypes: {},
  component: FormContainer,
  tags: ['autodocs'],
  title: 'rhf-core/FormContainer',
};

export default meta;

type Story = StoryObj<typeof FormContainer>;

export const BasicForm: Story = {
  render() {
    return (
      <FormContainer
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
        formProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 250,
          },
        }}
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlInputElement name="email" placeholder="email" type="email" required />
        <HtmlInputElement name="password" placeholder="password" type="password" required />
        <div style={{ display: 'flex', gap: 8 }}>
          <HtmlButtonElement>Reset</HtmlButtonElement>
          <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
        </div>
      </FormContainer>
    );
  },
};
