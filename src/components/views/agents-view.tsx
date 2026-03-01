"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingState from "@/components/common/loading-state";
import { DataTable } from "@/components/common/data-table/data-table";
import { agentColumns } from "@/components/common/data-table/columns";
import EmptyState from "@/components/common/empty-state";

export function AgentsViewLoading() {
    return <LoadingState
                title="Agents Loading"
                description="This may take a few seconds"
            />
};

export default function AgentsView() {
    const trpc = useTRPC();
    const { data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="flex flex-col flex-1 gap-y-4 pb-4 px-4 md-px-8">
            <DataTable data={data} columns={agentColumns}/>
            {!data.length && <EmptyState title="There are no agents here" description="Try to create first one by clicking 'Create' button"/>}
        </div>
    );
};