import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface HeaderProps {
    titile: string;
    description?: string;
};

export default function Header({ titile, description }: HeaderProps) {
    return (
        <CardHeader className="p-0 pb-8">
            <CardTitle className="text-2xl font-bold text-white">{titile}</CardTitle>
            {
                description && 
                <CardDescription className="text-zinc-500">
                    Enter your details to resume your sessions.
                </CardDescription>
            }
        </CardHeader>
    );
};