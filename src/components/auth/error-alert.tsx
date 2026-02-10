import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";

interface ErrorAlertProps {
    message?: string;
};

export default function ErrorAlert({ message } : ErrorAlertProps) {
    return (
        <Alert className="bg-destructive/10 border-none text-destructive!">
            <OctagonAlertIcon className="h-4 w-4"/>
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    );
}