"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingState from "@/components/common/loading-state";
import { DataTable } from "@/components/common/data-table/data-table";
import { agentColumns } from "@/components/common/data-table/columns";
import EmptyState from "@/components/common/empty-state";
import { useAgentsFilters } from "@/hooks/use-agents-filters";
import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";
import Pagination from "@/components/dashboard/agents/pagination";

export function AgentsViewLoading() {
    return <LoadingState
                title="Agents Loading"
                description="This may take a few seconds"
            />
};

export default function AgentsView() {
    const [{ page, search }, setFilters] = useAgentsFilters();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.agents.getMany.queryOptions({
            page: page || GET_MANY_CONSTANTS.DEFAUTL_PAGE,
            pageSize: GET_MANY_CONSTANTS.DEFAULT_PAGE_SIZE,
            search: search || ""
        })
    );

    return (
        <div className="flex flex-col flex-1 gap-y-4 pb-4 px-4 md-px-8">
            <DataTable data={data.items} columns={agentColumns}/>
            {
            !data.items.length 
            && 
            <EmptyState title="There are no agents here" description="Try to create first one by clicking 'Create' button"/>
            }
            <Pagination 
                page={page || GET_MANY_CONSTANTS.DEFAUTL_PAGE} 
                maximumPages={data.totalPages} 
                onPageChanged={(page) => setFilters({ page })}
            />
        </div>
    );
};