import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helper/getDataFromToken";
import User from "@/models/user";
import  connectDB  from "@/dbconfig/dbconfig";

connectDB();

export async function GET(req:NextRequest){
    try {
        const userID = await getDataFromToken(req);
        if(!userID) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const user = await User.findOne({_id:userID}).select("-password");
        if(!user) return NextResponse.json({error: "User not found"}, {status: 404});

        return NextResponse.json({message:"user fetched successfully", user}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}