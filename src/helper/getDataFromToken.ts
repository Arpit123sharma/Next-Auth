import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


const getDataFromToken = async (req: NextRequest) => {
   try {
      const token = req.cookies.get("token")?.value || '';
      const userID:any = await jwt.verify(token, process.env.JWT_SECRET_KEY!);
      return userID;
   } catch (error:any) {
     throw new Error(error?.message);
   }
} 

export default getDataFromToken;