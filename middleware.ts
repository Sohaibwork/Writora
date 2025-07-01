import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname, origin } = request.nextUrl;

  const isAuthPage = ["/sign-in", "/register", "/verify"].some((path) =>
    pathname.startsWith(path)
  );
  const isProtectedPage =
    pathname === "/editor" || pathname.startsWith("/dashboard");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/((?!sign-in|register|verify).*)"],
};
