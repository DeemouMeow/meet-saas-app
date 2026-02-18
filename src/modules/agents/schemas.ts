import { z } from "zod";

export const agentsCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instructions: z.string().min(1, { message: "Instructions is required" }),
});

export const agentsGetOneSchema = z.object({
    id: z.string()
});

export type AgentsCreateSchemaType = z.infer<typeof agentsCreateSchema>;