"use server";
import { auth } from "@/lib/auth";
import { SignUpFormSchema } from "./SignUpFormSchema";
import { ActionFormState } from "@/types/ActionFormState";
import { prisma } from "@/lib/prisma/prisma";

type SignUpActionFormStateFieldsErrors = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  username?: string[] | undefined;
};

export type SignUpActionFormState = ActionFormState<
  Record<string, string>,
  SignUpActionFormStateFieldsErrors
>;

export async function signUpFormAction(
  prevState: SignUpActionFormState,
  rawFormData: FormData
): Promise<SignUpActionFormState> {
  // Convert FormData to object
  const formData = Object.fromEntries(rawFormData);
  // then use zods schema to validate the form data on the server
  const parsed = SignUpFormSchema.safeParse(formData);

  // get the fields from the form data
  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString();
  }

  // if the form data is invalid, return an error message
  if (!parsed.success) {
    return {
      message: undefined,
      fieldErrors: parsed.error.flatten().fieldErrors,
      fields,
    };
  }

  // TODO: Check if user name is on the forbidden list
  // throw error if it is, things likes route names, etc

  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingEmail) {
      return {
        fieldErrors: { email: ["Email is already in use."] },
        fields,
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    if (existingUser) {
      return {
        fields,
        fieldErrors: { username: ["User name is already in use."] },
      };
    }

    // if the user name and email are not in use, create the user
    const res = await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.username,
        username: parsed.data.username,
      },
      asResponse: true,
    });

    console.log("Signup response:", res);

    if (res.status !== 200) {
      console.log("Signup response:", res);
      console.error("Signup error:");

      return {
        success: false,
        message: "An error occurred during sign up. Please try again later.",
        fields,
      };
    }

    return {
      success: true,
      message: "User created successfully.",
      fields,
    };
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      message: "An error occurred during sign up. Please try again later.",
    };
  }
}
