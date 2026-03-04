import type { LucideIcon } from "lucide-react";
import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export namespace Dashboard {
    type SidebarSectionItem = {
        label: string; 
        href: string; 
        icon?: LucideIcon; 
    };

    type Section = readonly SidebarSectionItem[];
};

export namespace AgentProcedures {
    type AgentGetOneOutput = inferRouterOutputs<AppRouter>["agents"]["getOne"];
};

export type ServerActionResult<T = void> = {
  success: boolean;
  message?: string;
  data?: T; 
};