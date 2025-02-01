import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface TokenData{
   userID:mongoose.Types.ObjectId | string
}
const getDataFromToken = async (req: NextRequest):Promise<string | mongoose.Types.ObjectId> => {
   try {
      const token = req.cookies.get("token")?.value || '';
      const tokenData = await jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenData;
      return tokenData?.userID || '';

   } catch (error:any) {
     throw new Error(error?.message);
   }
} 

export default getDataFromToken;