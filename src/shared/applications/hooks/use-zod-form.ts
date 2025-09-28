import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodForm<TSchema extends ZodType<any, any, any>>(
  schema: TSchema,
  defaultValues: z.infer<TSchema>,
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as ZodType<any, any, any>),
    mode: "onChange",
    defaultValues,
  });
}
