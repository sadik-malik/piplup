import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment } from '@mui/material';
import { MuiFileInputElement } from '@piplup/rhf-adapters/mui-file-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the [\<MuiFileInput /\>](https://viclafouch.github.io/mui-file-input/) component pre-configured with `useMuiFieldInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiFileInputElement } from '@piplup/rhf-adapters/mui-file-input';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiFileInputElement> = {
  args: {},
  argTypes: {},
  component: MuiFileInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-file-input/MuiFileInputElement',
};

export default meta;

const Template: StoryFn<typeof MuiFileInputElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <MuiFileInputElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Default',
  name: 'default-mui-file-input',
  placeholder: 'Insert a File',
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Multiple Files',
  multiple: true,
  name: 'multiple-files-mui-file-input',
  placeholder: 'Insert Multiple File',
};

export const HideSizeText = Template.bind({});
HideSizeText.args = {
  hideSizeText: true,
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Hide Size Text',
  name: 'hide-size-text-mui-file-input',
  placeholder: 'Insert a File',
};

export const CustomizeInputText = Template.bind({});
CustomizeInputText.args = {
  getInputText: (value: File | null) => (value ? 'Thanks!' : ''),
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Customize Text',
  name: 'customize-text-mui-file-input',
  placeholder: 'Insert a File',
};

export const CustomizeSizeText = Template.bind({});
CustomizeSizeText.args = {
  getSizeText: () => 'Very Big',
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Customize Size Text',
  name: 'customize-size-text-mui-file-input',
  placeholder: 'Insert a File',
};

export const ClearIconButton = Template.bind({});
ClearIconButton.args = {
  clearIconButtonProps: {
    children: <CloseIcon fontSize="small" />,
    title: 'Remove',
  },
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <AttachFileIcon />
      </InputAdornment>
    ),
  },
  label: 'Clear Icon Button',
  name: 'clear-icon-button-mui-file-input',
  placeholder: 'Insert a File',
};
