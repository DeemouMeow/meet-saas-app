"use client";

import { 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarMenu 
} from "@/components/ui/sidebar";
import SidebarSectionItemWrapper from "@/components/dashboard/sidebar-section-item";
import { Dashboard } from "@/types";
import { memo } from "react";

interface SidebarSectionProps {
    items: Dashboard.Section;
    label?: string;
};

function DashboardSidebarSection({ items }: SidebarSectionProps) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarSectionItemWrapper 
                            key={item.href} 
                            item={item}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default memo(DashboardSidebarSection);