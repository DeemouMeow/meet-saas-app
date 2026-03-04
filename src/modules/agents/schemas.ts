import { z } from "zod";
import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";

const { DEFAULT_PAGE_SIZE, DEFAUTL_PAGE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } = GET_MANY_CONSTANTS;

const agentsCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instructions: z.string().min(1, { message: "Instructions is required" }),
});

const agentsGetOneSchema = z.object({
    id: z.string()
});

const agentsGetManySchema = z.object({
    page: z.number(),
    pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE),
    search: z.string().nullish()
}).default({
    page: DEFAUTL_PAGE,
    pageSize: DEFAULT_PAGE_SIZE
});

type AgentsCreateSchemaType = z.infer<typeof agentsCreateSchema>;

export {
    agentsCreateSchema,
    agentsGetOneSchema,
    agentsGetManySchema,
    type AgentsCreateSchemaType
}
