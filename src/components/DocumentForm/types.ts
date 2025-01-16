import { ActionFormState } from "@/types/ActionFormState";

export type DocumentFormStateFieldsErrors = {
  title?: string[] | undefined;
  content?: string[] | undefined;
};

export type DocumentFormState = ActionFormState<
  Record<string, string>,
  DocumentFormStateFieldsErrors
>;
