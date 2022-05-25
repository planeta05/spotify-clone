import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl.clone()
  console.log(url)
  url.pathname = '/login'

  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  // Allow the request if the following is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirecting them to login if they dont have token AND are requesting a protexted route
  if (!token && pathname !== url.pathname) {
    return NextResponse.redirect(url)
  }
}
