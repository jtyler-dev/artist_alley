import { useEffect } from "react";
import { ActionFormState } from "@/types/ActionFormState";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const useSetFormFieldErrors = <T extends FieldValues>({
  formState,
  formClearErrors,
  formSetError,
}: {
  formState: ActionFormState;
  formClearErrors: () => void;
  formSetError: UseFormSetError<T>;
}) => {
  // useEffect to populate form fields with data from the server
  // if the formState.fieldErrors object is provided
  useEffect(() => {
    if (formState?.fieldErrors) {
      // clear any existing errors
      formClearErrors();
      // get the keys of the fields that have errors
      const keys = Object.keys(formState.fieldErrors);
      // loop through the keys and set the error message for each field
      keys.forEach((key) => {
        const fieldKey = key as keyof typeof formState.fieldErrors;
        const message =
          formState.fieldErrors![key as keyof typeof formState.fieldErrors];
        formSetError(fieldKey as Path<T>, { message: message![0] });
      });
    }
  }, [formClearErrors, formSetError, formState, formState?.fieldErrors]);
};
