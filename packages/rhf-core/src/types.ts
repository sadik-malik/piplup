import { type FieldPath, type FieldValues, type PathValue, type UseControllerProps } from 'react-hook-form';
import { type UseComposeModifierStateResult } from './hooks/use-compose-modifier-state';
import { type ComposeRulesMessages } from './hooks/use-compose-rules';

export interface StandardFieldAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends UseControllerProps<TFieldValues, TName> {
  classes?: Record<string, string>;
  className?: string;
  composeClassName?: boolean;
  disableOnIsSubmitting?: boolean;
  messages?: ComposeRulesMessages;
  onBlur?: (
    // User needs to write their own types for the rest parameters here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  onChange?: (
    // User needs to write their own types for the rest parameters.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  required?: boolean;
  style?:
    | ((modifierState: UseComposeModifierStateResult) => React.CSSProperties)
    | React.CSSProperties;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      // User needs to write their own types for the rest parameters.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };
}
