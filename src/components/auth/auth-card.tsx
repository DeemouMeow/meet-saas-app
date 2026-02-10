import React from "react";
import {
    CardContent, 
    CardFooter 
} from "@/components/ui/card";
import Link from "next/link";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    backButtonText: string;
    backButtonLabel: string;
    backButtonHRef: string;
    showSocial?: boolean;
    headerDescription?: string;
};

export default function AuthCard({ 
    children,
    headerTitle, 
    headerDescription,
    backButtonText,
    backButtonHRef,
    backButtonLabel,
    showSocial
} : CardWrapperProps) {
    return (
        <>
            <Header titile={headerTitle} description={headerDescription}/>
            <CardContent className="grid gap-4 p-0">
                {children}
            </CardContent>
            
            {showSocial && <Social/>}
            <CardFooter className="p-0 pt-8">
                <p className="w-full text-center text-sm text-zinc-500">
                    {backButtonLabel && `${backButtonLabel} `}
                    <Link href={backButtonHRef} className="font-semibold text-white hover:text-green-400 underline-offset-4 hover:underline transition-all">
                        {backButtonText}
                    </Link>
                </p>
            </CardFooter>
        </>
    );
}