import * as React from 'react';
import {
  type FieldValues,
  FormProvider as ReactHookFormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm,
  type FormProviderProps as ReactHookFormProviderProps,
} from 'react-hook-form';
import { FormErrorParserContext, FormErrorParserFn } from './context/form-error-parser-context';

interface FormContainerWithoutUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> {
  formContext: Omit<
    ReactHookFormProviderProps<TFieldValues, TContext, TTransformedValues>,
    'children'
  >;
  formProps?: Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'>;
  onSubmit?: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
    ? SubmitHandler<TTransformedValues>
    : never;
  onError?: SubmitErrorHandler<TFieldValues>;
  errorParser?: FormErrorParserFn;
  children: React.ReactNode;
}

function FormContainerWithoutUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(props: FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const { formContext, formProps, onSubmit, onError, errorParser, children } = props;
  return (
    <ReactHookFormProvider {...formContext}>
      <FormErrorParserContext.Provider value={errorParser}>
        <form
          noValidate
          {...formProps}
          onSubmit={
            typeof onSubmit === 'function'
              ? formContext.handleSubmit(onSubmit, onError)
              : () => console.warn('Callback `onValid` is missing from FormContainer.')
          }
        >
          {children}
        </form>
      </FormErrorParserContext.Provider>
    </ReactHookFormProvider>
  );
}

interface FormContainerWithUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> extends UseFormProps<TFieldValues, TContext>,
    Omit<
      FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>,
      'formContext'
    > {}

function FormContainerWithUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(props: FormContainerWithUseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const { formProps, onSubmit, onError, errorParser, children, ...UseFormProps } = props;

  const formContext = useForm<TFieldValues, TContext, TTransformedValues>({
    ...UseFormProps,
  });

  return (
    <FormContainerWithoutUseForm
      formProps={formProps}
      formContext={formContext}
      errorParser={errorParser}
      onError={onError}
      onSubmit={onSubmit}
    >
      {children}
    </FormContainerWithoutUseForm>
  );
}

export type FormContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> =
  | (FormContainerWithUseFormProps<TFieldValues, TContext, TTransformedValues> & {
      formContext?: undefined;
    })
  | FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>;

export function FormContainer<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(props: FormContainerProps<TFieldValues, TContext, TTransformedValues>) {
  const { errorParser, formContext, ...rest } = props;

  if (!formContext) {
    return <FormContainerWithUseForm errorParser={errorParser} {...rest} />;
  }

  return (
    <FormContainerWithoutUseForm formContext={formContext} errorParser={errorParser} {...rest} />
  );
}
