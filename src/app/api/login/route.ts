import dbConnect from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";
import User, { IUSER } from "@/models/user";

dbConnect()

export  async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const validatedObject = loginSchema.parse(body);

        const isUserExisted = await User.findOne({email: validatedObject.email}) as IUSER;
       
        if(!isUserExisted){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const isPasswordMatched = await isUserExisted.comparePassword(validatedObject.password);
        if(!isPasswordMatched){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400});
        }

        const token = await isUserExisted.generateToken();
        const response = NextResponse.json({message: "Login success"}, {status: 200});
        response.cookies.set('token', token, {
            httpOnly: true,
            secure:true
        })
        return response;
    } catch (error:any) {
        if(error instanceof z.ZodError){
            return NextResponse.json({error: error.errors}, {status: 400});
        }
        return NextResponse.json({error: error.message}, {status: 500});
    }
    
}