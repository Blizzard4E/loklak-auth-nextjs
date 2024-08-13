import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./app/loklak";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    let userData = await getSession();
    if (userData) return;
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: "/protected/:path*",
};
