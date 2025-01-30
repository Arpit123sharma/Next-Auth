'use client';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster,toast } from 'react-hot-toast';
const signupPage = () => {
   const router = useRouter();
   const [userData, setUserData] = React.useState({
       email:"",
       password: "",
   });
   
   const [loading,setLoading] = React.useState(false);

   const signIN = async () => {
     try {
      setLoading(true);
      await axios.post('/api/login',userData);
      toast.success('login success');
      router.push('/profile');
     } catch (error:any) {
       console.error('error while login: ',error);
       toast.error(error?.response?.data?.error || error.message);
     } finally{
        setLoading(false);
     }
   };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
        <div className="bg-slate-600 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold m-3">{loading?"Processing...":"Login Page"}</h1>
            
            <label htmlFor="email" typeof="email"
            className="text-white m-1 text-lg">
                email:
            </label>
            <input id="email" type="email" className="p-2 rounded-lg" 
            placeholder="email" value={userData.email} 
            onChange={(e)=>setUserData((prev)=>({...prev,email:e.target.value}))}
            />

            <label htmlFor="password" typeof="password"
            className="text-white m-1 text-lg">
                password:
            </label>
            <input id="password" type="password" className="p-2 rounded-lg" 
            placeholder="password" value={userData.password} 
            onChange={(e)=>setUserData((prev)=>({...prev,password:e.target.value}))}
            />

            <button className="bg-slate-500 p-2 rounded-lg text-white w-32 m-2"
            onClick={signIN}>
              signIN
            </button>

            <p>
                Don't have an Account? 
                <Link href="/signup" className='text-red-500 font-semibold text-lg ml-1'>
                  Create Account!
                </Link>
            </p>
        </div>
        <Toaster />
    </div>
  )
}

export default signupPage;