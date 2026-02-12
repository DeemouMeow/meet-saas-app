"use client";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import CommandButton from "@/components/dashboard/navbar/command-button";

export default function DashboardNavbar() {
    const { isMobile, toggleSidebar, state } = useSidebar();

    return (
        <nav className="flex items-center gap-2 px-4 py-3 border-b bg-black/2">
            <Button 
                className="size-9 cursor-pointer" 
                variant="outline" 
                onClick={toggleSidebar}
            >
                {
                    (state === "collapsed" || isMobile) 
                    ?
                    <PanelLeftOpenIcon/> 
                    :
                    <PanelLeftCloseIcon/>
                }
            </Button>
            <CommandButton/>
        </nav>
    );
};