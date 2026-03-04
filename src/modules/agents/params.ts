import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const filtersSearchParams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(GET_MANY_CONSTANTS.DEFAUTL_PAGE).withOptions({ clearOnDefault: true })
};

export const loadSearchParams = createLoader(filtersSearchParams);