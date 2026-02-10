import { memo } from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Dashboard } from "@/types";
import Link from "next/link";

interface SidebarItemViewProps {
    item: Dashboard.SidebarSectionItem;
    isActive: boolean;
};

function SidebarItemView({ item, isActive }: SidebarItemViewProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton 
                asChild
                isActive={isActive}
                className={cn(
                    "h-10 border border-transparent transition-all",
                    isActive && "bg-linear-to-r/oklch border-[#5D6B68]/10 text-white shadow-sm"
                )}
            >
                <Link href={item.href}>
                    {item.icon && <item.icon className="size-5 shrink-0" />}
                    <span className="text-sm font-medium tracking-tight">
                        {item.label}
                    </span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default memo(SidebarItemView);
