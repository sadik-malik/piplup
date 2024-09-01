import * as React from 'react';
import { type FieldError } from 'react-hook-form';

export type FormErrorParserFn = (error?: FieldError) => React.ReactNode;

export const FormErrorParserContext = React.createContext<FormErrorParserFn | null | undefined>(
  null
);
