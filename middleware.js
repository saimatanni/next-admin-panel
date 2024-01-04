// import { NextResponse } from "next/server";

// export function Middleware(request){
//     if(request.nextUrl.pathName !== "/authentication/sign-in"){
//         return  NextResponse.redirect(new URL("/authentication/sign-in", request.url))
//     }

// }
export {default} from 'next-auth/middleware'
export const config ={
    matcher:["/", "/pages/profile", '/pages/applications', '/update/:path*']
}