import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", req.url))
  }
})

export const config = { matcher: ["/admin/:path*"] }
