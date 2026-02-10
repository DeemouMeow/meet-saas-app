"use server";

import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth"; 

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PRIVATE_ROUTES = ["/"];
const PUBLIC_ROUTES = ["/about"];

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({ headers: request.headers });
    const isAuthenticated = !!session;

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuthenticated) {
        if (isPublicRoute || isAuthRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};