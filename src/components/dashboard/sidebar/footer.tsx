"use client";

import { SidebarFooter } from "@/components/ui/sidebar";
import DashboardUserButton from "@/components/dashboard/user-button/user-button";

export default function DashboardSidebarFooter() {
    return (
        <SidebarFooter className="text-white">
            <DashboardUserButton/>
        </SidebarFooter>
    );
}