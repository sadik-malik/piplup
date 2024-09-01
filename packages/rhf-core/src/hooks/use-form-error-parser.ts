import * as React from 'react';
import { FormErrorParserContext, type FormErrorParserFn } from '../context';

const defaultErrorParser: FormErrorParserFn = (error) => {
  return error?.message;
};

export function useFormErrorParser(): FormErrorParserFn {
  const context = React.useContext(FormErrorParserContext);
  return React.useMemo(() => (context ? context : defaultErrorParser), [context]);
}
