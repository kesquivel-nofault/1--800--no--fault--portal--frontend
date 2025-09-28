import { z } from "zod";

export const emailStepSchema = z.object({
  email: z.email("Invalid email address"),
});

export const codeStepSchema = z.object({
  email: z.email(),
  code: z
    .string()
    .min(6, "Code must be at least 6 digits")
    .max(6, "Code must be 6 digits"),
});

export const signInSchema = z.union([emailStepSchema, codeStepSchema]);

export type EmailStepForm = z.infer<typeof emailStepSchema>;
export type CodeStepForm = z.infer<typeof codeStepSchema>;
export type SignInFormSchema = z.infer<typeof signInSchema>;
