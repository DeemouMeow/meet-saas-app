"use client";

import { DASHBOARD_SECTIONS } from "@/configs/dashboard";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,

} from "@/components/ui/sidebar";

import DashboardSidebarSection from "@/components/dashboard/sidebar-section";
import SidebarSeparator from "@/components/dashboard/sidebar-separator";
import Link from "next/link";


export default function DashboardSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link className="flex items-center gap-5 px-3 pt-3" href="/dashboard">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-green-500/50 bg-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                        <div className="w-4 h-4 rounded-full bg-green-400/70 animate-pulse"></div>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-white">
                        DEEMEOW<span className="text-green-400 italic">.AI</span>
                    </h1>
                </Link>
            </SidebarHeader>

            <SidebarSeparator/>

            <SidebarContent>
                <DashboardSidebarSection items={DASHBOARD_SECTIONS[0]}/>
                <SidebarSeparator/>
                <DashboardSidebarSection items={DASHBOARD_SECTIONS[1]}/>
            </SidebarContent>
        </Sidebar>
    );
};
