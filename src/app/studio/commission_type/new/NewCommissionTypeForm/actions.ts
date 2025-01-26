"use server";
import { ActionFormState } from "@/types/ActionFormState";
import { prisma } from "@/lib/prisma/prisma";

export type NewCommissionTypeFormStateFieldsErrors = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  username?: string[] | undefined;
};

export type NewCommissionTypeFormState = ActionFormState<
  Record<string, string>,
  NewCommissionTypeFormStateFieldsErrors
>;

export async function newCommissionTypeFormAction(
  prevState: NewCommissionTypeFormState,
  rawFormData: FormData
): Promise<NewCommissionTypeFormState> {
  return new Promise((resolve, reject) => {});
}
