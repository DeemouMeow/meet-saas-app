"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";

import { useCallback } from "react";
import UserButtonDropdown from "@/components/dashboard/user-button/dropdown";


export default function DashboardUserButton() {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    const memoizedCallback = useCallback(() => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push(APP_ROUTES.login)
            }
        });
    }, []);

    if (isPending || !data?.user)
        return null;

    return <UserButtonDropdown logout={memoizedCallback} user={data.user}/>;
};