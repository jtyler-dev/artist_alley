import { ActionFormState } from "@/types/ActionFormState";

type FormBuilderActionFormStateFieldsErrors = {
  title?: string[] | undefined;
  description?: string[] | undefined;
};

export type FormBuilderActionFormState = ActionFormState<
  Record<string, string>,
  FormBuilderActionFormStateFieldsErrors
>;
