"use client";

import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useAgentsFilters = () => {
    return useQueryStates({
            search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
            page: parseAsInteger.withDefault(GET_MANY_CONSTANTS.DEFAUTL_PAGE).withOptions({ clearOnDefault: true }),
    });
};