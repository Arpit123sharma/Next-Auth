import { NextRequest, NextResponse } from "next/server";


export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    const isPath = path == "/login" || path == "/signup";
    
    const token = req.cookies.get("token")?.value || '';

    if (isPath && token) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if(!isPath && !token){
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}

export const config = {
    matcher:[
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:id'
    ]
}
