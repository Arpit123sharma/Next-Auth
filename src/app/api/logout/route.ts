import dbConnect from "@/dbconfig/dbconfig";
import {NextResponse} from "next/server";

dbConnect();

export function GET(){
    try {
        const response = NextResponse.json({message: "Logout successful",sucess:true} );
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: true,
        });
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}