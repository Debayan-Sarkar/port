import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin-session")?.value

  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login and register pages
    if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/register") {
      if (sessionCookie) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // Protect all other admin routes
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
