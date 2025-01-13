import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import * as Routes from "@/constants/routes";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL(Routes.SIGN_UP, request.url));
  }

  // TODO: add in admin check here

  return NextResponse.next();
}

// matcher cant be a dynamic string, has to be hardcoded
export const config = {
  matcher: [
    "/home/:path*",
    "/dashboard/:path*",
    "/commission/:path*",
    "/studio/:path*",
    "/settings/:path*",
  ],
};
