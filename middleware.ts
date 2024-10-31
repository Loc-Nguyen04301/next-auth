// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        console.log('middleware function', { req })
        const { origin, pathname } = req.nextUrl
        const { token } = req.nextauth

        // redirect về trang hôm khi truy cập vào /dashboard
        if (pathname.startsWith('/dashboard')) {
            // return NextResponse.redirect(origin)
            return new NextResponse('YOy are not authorized')
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                console.log('middleware', { req, token })
                return !!token
            }
        },
    },
)

export const config = {
    matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"],
}
