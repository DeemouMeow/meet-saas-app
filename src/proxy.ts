"use server";

import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth"; 
import { APP_ROUTES, AUTH_ROUTES, PRIVATE_ROUTES } from '@/lib/routes';

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({ headers: request.headers });
    const isAuthenticated = !!session;

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isPriviteRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL(APP_ROUTES.dashbaord, request.url));
    }

    if (!isAuthenticated) {
        if (isAuthRoute && !isPriviteRoute) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL(APP_ROUTES.login, request.url));
    }

    return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};