import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AgentsView, { AgentsViewLoading } from "@/components/views/agents-view";
import AgentsListHeader from "@/components/dashboard/agents/agents-list-header";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";
import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";

interface AgentsProps {
    searchParams: Promise<SearchParams>;
};

export default async function Agents({ searchParams }: AgentsProps) {
    const queryClient = getQueryClient();
    const { search, page } = await loadSearchParams(searchParams);

    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        page: page || GET_MANY_CONSTANTS.DEFAUTL_PAGE,
        search: search || "",
        pageSize: GET_MANY_CONSTANTS.DEFAULT_PAGE_SIZE
    }));

    return (
        <>
            <AgentsListHeader/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading/>}>
                    <AgentsView/>
                </Suspense>
            </HydrationBoundary>
        </>
    );
};