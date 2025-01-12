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

  return NextResponse.next();
}

export const config = {
  matcher: [
    `${Routes.HOME}/:path*`,
    `${Routes.DASHBOARD}/:path*`,
    `${Routes.COMMISSION}/:path*`,
    `${Routes.STUDIO}/:path*`,
    `${Routes.SETTINGS}/:path*`,
  ],
};
