import { AlertCircleIcon } from "lucide-react";

interface LoadingStateProps {
    title: string;
    description: string;
};

export default function ErrorState({ title, description }: LoadingStateProps) {
    return (
        <div className="flex flex-1 items-center justify-center py-4 px-8">
            <div className="p-10 flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg shadow-sm">
                <AlertCircleIcon className="size-6 text-destructive"/>
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};