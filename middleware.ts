// import { getToken } from "next-auth/jwt";
// import withAuth from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export const config = {
//   matcher: ["/host", "/reservations", "/properties", "/favorites"],
// };

// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req });
//     const isAuth = !!token;

//     // if (!isAuth) {
//     //   let from = req.nextUrl.pathname;
//     //   if (req.nextUrl.search) {
//     //     from += req.nextUrl.search;
//     //   }

//     //   return NextResponse.redirect(
//     //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
//     //   );
//     // }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true;
//       },
//     },
//   }
// );

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
