
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

const OTPVerification = () => {

  const router = useRouter()
const [enterotp, setenterotp] = useState(0);
  

 

  async function otp(){
   const verification = await fetch("/api/Student/otp",{
    method:"POST",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify({userotp:enterotp})

   })
   if(verification.ok){
    router.push("/StudentAdmission")
    console.log("done");
    
   }else{
    console.log("error");
    
   }
  }
 
  return (


    <div className='bg-gradient-primary'>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-300">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-800 mb-4">One-Time Password</h2>
        <p className="text-lg mb-6">Hello, student</p>
        <input
          type="number"
          maxLength='6s'
          onChange={(e) => setenterotp(e.target.value)}
          className="w-full border border-red-300  rounded-md p-3 mb-6 text-center text-lg  shadow-xl/black bg-gray-300"
          placeholder="Enter OTP"
        />
        <p className="mb-6 text-sm text-black-600 ">
          Please enter the one-time password to verify your identity and complete your student admission.
        </p>
        <div className="flex justify-between">
          <button
    
            className="bg-red-800 text-[#ffd700] px-6 py-2 rounded-md hover:bg-red-900"
          >
            Cancel
          </button>
          <button
                   onClick = {
                    () => otp()
                     }
            className=" text-[blue] px-6 py-2 -md hover:bg-blue-600"
          >
            Resend otp
          </button>
          <button
                   onClick = {
                    () => otp()
                     }
            className="btn-danger text-[#ffd700] px-6 py-2 rounded-md hover:bg-yellow-600"
          >
            Verify
          </button>
        </div>
      </div>
    </div>   

      page</div>
  )
}
export default OTPVerification 