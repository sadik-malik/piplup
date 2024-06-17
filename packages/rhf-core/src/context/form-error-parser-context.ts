import * as React from 'react';
import { FieldError } from 'react-hook-form';

export type FormErrorParserFn = (error?: FieldError) => React.ReactNode;

const FormErrorParserContext = React.createContext<FormErrorParserFn | null | undefined>(null);

export default FormErrorParserContext;
