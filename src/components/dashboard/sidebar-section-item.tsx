"use client";

import { Dashboard  } from "@/types"
import { usePathname } from "next/navigation";
import SidebarItemView from "./sidebar-item-view";

interface SidebarSectionItemProps {
    item: Dashboard.SidebarSectionItem;
};

export default function SidebarSectionItemWrapper({ item } : SidebarSectionItemProps) {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return <SidebarItemView item={item} isActive={isActive}/>
};
