import { Dashboard } from "@/types";
import { BotIcon, type LucideIcon, StarIcon, VideoIcon } from "lucide-react";

const generateSectionItem = (icon: LucideIcon, label: string, href: string) : Dashboard.SidebarSectionItem => {
    return {
        icon,
        label,
        href
    };
};

export const DASHBOARD_SECTIONS = [
    [
        generateSectionItem(VideoIcon, "Meetings", "/dashboard/meetings"),
        generateSectionItem(BotIcon, "Agents", "/dashboard/agents"),
    ],
    [
        generateSectionItem(StarIcon, "Updgrade", "/dashboard")
    ]
] as const;