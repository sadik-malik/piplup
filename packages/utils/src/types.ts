export type ExtractRef<ComponentProps> = ComponentProps extends { ref?: React.Ref<infer R> }
  ? React.Ref<R>
  : React.Ref<unknown>;
