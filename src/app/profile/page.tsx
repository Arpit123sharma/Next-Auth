'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import {toast, Toaster } from 'react-hot-toast';
import Link from "next/link"

function profile() {
  const router = useRouter();

  const [userDetails,setUserDetails] = React.useState({
    userId:null
  })

  const Logout = async () => {
    try {
      await axios.get('/api/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('error while logging out', error);
      toast.error('Error while logging out');
    }
  }
  const getDetails = async () => {
    try {
      const response = await axios.get('/api/profile');
      console.log('user details', response);
      setUserDetails((prev)=>({...prev,userId:response.data.user._id}));
    } catch (error:any) {
      console.error('error while getting user details', error);
      toast.error(error.response.data.error || 'Error while getting user details');      
    }
  }

  return (
    <div className='bg-black h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center p-4 gap-2'>
        <h1 className='text-white text-3xl'>Profile</h1>
        <button 
          className='bg-blue-500 p-2 text-black text-lg rounded-lg'
          onClick={Logout}>
            Logout
        </button>
        <button className='bg-green-500 p-2 text-black text-lg rounded-lg'
        onClick = {getDetails}>
          getUserDetails
        </button>
        {userDetails.userId?(
        <Link className='bg-lime-500 p-2 text-black text-lg rounded-lg'
        href={`/profile/${userDetails.userId}`}>
          {userDetails.userId}</Link>
        ):(null)}
      </div>
      <Toaster />
    </div>
  )
}

export default profile