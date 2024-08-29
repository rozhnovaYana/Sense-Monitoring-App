import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.name && request.nextUrl.pathname !== 'login') {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
