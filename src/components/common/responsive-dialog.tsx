"use client";

import { useIsMobile } from "@/hooks/use-mobile";

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { 
    Drawer, 
    DrawerContent, 
    DrawerDescription, 
    DrawerHeader, 
    DrawerTitle 
} from "@/components/ui/drawer";

interface ResponsiveDialogueProps {
    title: string;
    description: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function DialogDrawer({
    title,
    description,
    children,
    open,
    onOpenChange
}: ResponsiveDialogueProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default function ResponsiveDialog({
    title,
    description,
    children,
    open,
    onOpenChange
}: ResponsiveDialogueProps) {
    const isMobile = useIsMobile();

    if (isMobile)
        return (<DialogDrawer 
                    title={title}
                    description={description}
                    open={open}
                    onOpenChange={onOpenChange}
                >
                    {children}
                </DialogDrawer>);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="justify-center">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};