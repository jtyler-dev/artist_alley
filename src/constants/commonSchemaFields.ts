import z from "zod";

export const CREATE_PASSWORD_RULE = z
  .string()
  .min(8, {
    message: "Must be at least 8 characters",
  })
  .max(40, {
    message: "Must be less than 40 characters",
  });

export const ALPHA_NUMERIC_REFINE = (value: string) => {
  return /^^[a-zA-Z0-9-_]*$/.test(value);
};
