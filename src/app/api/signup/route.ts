import {NextRequest,NextResponse} from 'next/server';
import dbConnect from '@/dbconfig/dbconfig';
import User from '@/models/user';
import {signupSchema} from '@/schemas/signupSchema';
import {z} from 'zod';

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedObject = signupSchema.parse(body);

    const isUserAlreadyExists = await User.findOne({email: validatedObject.email});
    if(isUserAlreadyExists)
    {
      return NextResponse.json({error: "User already exists"}, {status: 400});
    } 
    const createdUser = await User.create({
      email: validatedObject.email,
      password: validatedObject.password,
      username: validatedObject.username
    });

    return NextResponse.json({message: "User created successfully",user:createdUser}, {status: 201});
    
  } catch (error:any) {
    if(error instanceof z.ZodError){
      return NextResponse.json({error: error.errors}, {status: 400});
    }
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
  