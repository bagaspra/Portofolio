import { auth } from "@/auth"

// next-auth v5 auth() accepts a callback to use as middleware/proxy
// When called with a function, it returns a handler that wraps the callback
// with session information attached to req.auth
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return Response.redirect(url)
  }
})

export const config = { matcher: ["/admin/:path*"] }
