import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().pipe(z.email()),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const registerSchema = z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim().optional(),
    email: z.string().pipe(z.email()),
    password: z.string().min(8, {
        message: "Password minimum length is 8"
    })
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;