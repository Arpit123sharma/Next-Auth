import React from 'react'

async function profile({params}:any) {
  const {id} = await params;
  
  return (
    <div className='bg-black h-screen flex justify-center items-center'>
        <h1 className='text-white text-3xl'>
            Profile
            <span className='text-black text-3xl bg-orange-600 p-1 rounded-md ml-1'>{id}</span>
        </h1>
        
    </div>
  )
}

export default profile