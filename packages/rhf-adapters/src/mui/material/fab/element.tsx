import * as React from 'react';
import { Fab, type FabProps } from '@mui/material';
import { type FieldValues } from 'react-hook-form';
import { useMuiFabAdapter, type UseMuiFabAdapterProps } from './adapter';

export interface MuiFabElementProps<TFieldValues extends FieldValues = FieldValues>
  extends UseMuiFabAdapterProps<TFieldValues, FabProps> {}

function MuiFabComponent<TFieldValues extends FieldValues = FieldValues>(
  props: MuiFabElementProps<TFieldValues>,
  ref?: FabProps['ref']
) {
  const adapter = useMuiFabAdapter<TFieldValues, FabProps>(props, ref);
  return <Fab {...adapter} />;
}

export const MuiFabElement = React.forwardRef(MuiFabComponent);

MuiFabElement.displayName = 'MuiFabElement';
