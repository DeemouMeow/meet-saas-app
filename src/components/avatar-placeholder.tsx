import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarPlaceholderProps {
    seed: string;
    classname?: string;
};

export default function AvatarPlaceholder({ seed, classname } : AvatarPlaceholderProps) {
    const avatar = createAvatar(botttsNeutral, {
        seed
    });

    return (
        <Avatar className={cn(classname)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};


