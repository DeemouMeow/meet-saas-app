import type { LucideIcon } from "lucide-react";

export namespace Dashboard {
    export type SidebarSectionItem = {
        label: string; 
        href: string; 
        icon?: LucideIcon; 
    };

    export type Section = readonly SidebarSectionItem[];
};