import { ActionFormState } from "@/types/ActionFormState";
import { FormFieldType } from "@prisma/client";

type FormBuilderActionFormStateFieldsErrors = {
  title?: string[] | undefined;
  description?: string[] | undefined;
};

export type FormBuilderActionFormState = ActionFormState<
  Record<string, string>,
  FormBuilderActionFormStateFieldsErrors
>;

export type UpdateFieldType = {
  question?: string;
  description?: string;
  type?: FormFieldType;
  options?: string[];
  isRequired?: boolean;
};
