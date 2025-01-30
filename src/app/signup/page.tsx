'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import {Toaster, toast } from 'react-hot-toast';
const signupPage = () => {
   const router = useRouter();
   const [userData, setUserData] = React.useState({
       username: "",
       email:"",
       password: "",
   });
   const [loading,setLoading] = React.useState(false);
   const signUP = async () => {
      try {
        setLoading(true);
        await axios.post('/api/signup',userData);
        toast.success('signup successfull');
        router.push('/login')
      } catch (error:any) {
        console.error('error while signup:',error);
        toast.error(error?.response?.data?.error || 'signup failed');
      }finally{
        setLoading(false);
      }
   };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
        <div className="bg-slate-600 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold m-3">{loading ? "Processing..." : "signupPage"}</h1>
            <label htmlFor="username" typeof="text"
            className="text-white m-1 text-lg">
                username:
            </label>
            <input id="username" type="text" className="p-2 rounded-lg" 
            placeholder="username" value={userData.username} 
            onChange={(e)=>setUserData((prev)=>({...prev,username:e.target.value}))}
            />

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
            onClick={signUP}>
              signup
            </button>

            <p>
                have an Account? 
                <Link href="/login" className='text-red-500 font-semibold text-lg ml-1'>
                  login here!
                </Link>
            </p>
        </div>
        <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#F44336',
              color: 'white',
            },
          },
        }}
        />
    </div>
    
  )
}

export default signupPage;