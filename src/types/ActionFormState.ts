export type ActionFormState<
  TFields = Record<string, string>,
  TFieldErrors = Record<string, string[] | undefined>,
> = {
  success?: boolean;
  message?: string;
  fields?: TFields; // Form fields that might be returned
  fieldErrors?: TFieldErrors;
  data?: unknown;
};
