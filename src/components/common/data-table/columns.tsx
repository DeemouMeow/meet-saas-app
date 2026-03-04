"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentProcedures } from "@/types";
import AvatarPlaceholder from "@/components/common/avatar-placeholder";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const agentColumns: ColumnDef<AgentProcedures.AgentGetOneOutput>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-3">
            <AvatarPlaceholder seed={row.original.name} classname="size-6"/>
            <span className="font-semibold capitalize">{row.original.name}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground"/>
            <span className="text-sm text-muted-foreground max-w-40 truncate">
              {row.original.instructions}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "id",
    header: "MEETINGS COUNT PLACEHOLDER",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-5">
        <VideoIcon className="size-3 text-blue-900"/>
        <span className="text-medium">meetings</span>
      </Badge>
    )
  }
];