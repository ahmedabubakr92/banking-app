import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const authRoutes = ["/sign-up", "/sign-in"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  let isValidToken = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isValidToken = true;
    } catch {
      isValidToken = false;
    }
  }

  const isAuthRoute = authRoutes.includes(pathname);

  if (!isValidToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (isValidToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico|.*\\.gif).*)",
  ],
};
