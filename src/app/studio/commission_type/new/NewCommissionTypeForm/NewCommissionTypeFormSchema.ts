import z from "zod";

// TODO: move to common schema fields?
export const commissionAddOnSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  details: z.string().min(1, "Details are required"),
  price: z.number().optional(),
  currency: z.string().optional(),
});

export type CommissionAddOnSchemaType = z.infer<typeof commissionAddOnSchema>;

export const NewCommissionTypeFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  details: z.string().nonempty("Details are required"),
  price: z.number().int().nonnegative("Price must be at least 0"), // default to 0
  currency: z.string().nonempty("Currency is required"),
  isActive: z.boolean().default(false),
  activeAt: z.date().optional(),
  inactiveAt: z.date().optional(),
  allowMessages: z.boolean().default(false),
  numberOfSlots: z.number().nullable().optional(),
  commissionAddOns: z.array(commissionAddOnSchema),
});

export type NewCommissionTypeFormSchemaType = z.infer<
  typeof NewCommissionTypeFormSchema
>;
