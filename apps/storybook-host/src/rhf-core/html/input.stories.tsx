import {
  FormContainer,
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlInputElement,
} from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the html `<input>` element pre-configured with `useHtmlInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { HtmlInputElement } from '@piplup/rhf-core';
 * ```
 */
const meta: Meta<typeof HtmlInputElement> = {
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
  component: HtmlInputElement,
  tags: ['autodocs'],
  title: 'rhf-core/html/HtmlInputElement',
};

export default meta;

type Story = StoryObj<typeof HtmlInputElement>;

export const Default: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="input" placeholder="Type text here" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="input"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const TextInput: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="input" placeholder="Type text here" type="text" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="input"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const PasswordInput: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement
          {...props}
          name="password"
          placeholder="Type password here"
          type="password"
        />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="password"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Checkbox: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="checkbox" type="checkbox" value="one" />
        <label>One</label>
        <br />
        <HtmlInputElement name="checkbox" type="checkbox" value="two" />
        <label>Two</label>
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="input"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Color: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="color" type="color" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="color"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Date: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="date" type="date" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="date"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const DateTimeLocal: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="datetime-local" type="datetime-local" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="datetime-local"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Email: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="email" type="email" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="email"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const File: Story = {
  argTypes: {
    multiple: {
      control: 'boolean',
    },
  },
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="file" type="file" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="file"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Month: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="month" type="month" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="month"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Number: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="number" type="number" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="number"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Radio: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="radio" type="radio" value="one" />
        <label>One</label>
        <br />
        <HtmlInputElement name="radio" type="radio" value="two" />
        <label>Two</label>
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="input"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Range: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="range" type="range" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="range"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Search: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="search" type="search" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="search"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Tel: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="tel" type="tel" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="tel"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Time: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="time" type="time" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="time"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const URL: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="url" type="url" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="url"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const Week: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <HtmlInputElement {...props} name="week" type="week" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="week"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};
