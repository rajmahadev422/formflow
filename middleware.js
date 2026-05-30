import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-email', token.email);

  // 3. Pass the mutated headers downstream to your routes
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/forms/:path*", "/api/:path*"],
};
