'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardProviderVerification() {
  const router = useRouter()
  const [check,setChecked] = useState(false)
  const [firstName ,setfirstName] = useState("")
  const [lastName ,setlastName] = useState("")
  const [emailAddress ,setemailAddress] = useState("")
  
console.log(firstName);
console.log(emailAddress);



 async function student(e){
  e.preventDefault()
    const result=await fetch("/api/Student/studentverification",{
      method:"POST",
      headers:{
        "content-Type":"application/json" 
      },
      body:JSON.stringify({firstName:firstName,lastName:lastName,emailAddress:emailAddress})
    })
    if(result.ok){
      console.log("sending.........");
      
     await fetch("/api/Student/otp",{
      method:"POST",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({Email:emailAddress})
     })
     router.push("/otp")
     console.log("done");
     
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-fixed from-red-700 to-gray-100 p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">Profile Verification</h1>
      
      <div className="bg-auto bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/neustlogo-nobg.png" className="mx-auto w-24 my-2" />
          <p className="text-red-800 font-bold text-md leading-tight">
            UNIVERSITY OF SOUTHERN<br />NUEVA ECIJA
          </p>
        </div>
        <form onSubmit={student} className="text-sm">
          <label className="font-semibold block mt-2">Last Name:</label>
          <input type="text" name="lastName" onChange={(e)=>setlastName(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Last Name" />

          <label className="font-semibold block mt-2">First Name:</label>
          
          <input type="text" name="firstName"
          onChange={(e) => setfirstName(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="First Name" />

          <label className="font-semibold block mt-2">Middle Name:</label>
          <input type="text" name="middleName"  disabled={check}  className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Middle Name" />
          
          <label className="block mt-1">
            <input type="checkbox" name="noMiddleName" checked={check} onChange={() => setChecked(prev => !prev)} className="mr-2" />
            I don't have a middle name.
          </label>

          <label className="font-semibold block mt-2">Email Address:</label>
          <input type="email" name="emailAddress" onChange={(e)=>setemailAddress(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Email Address" />

          <label className="font-semibold block mt-2">Contact:</label>
          <input type="number" maxLength={11} name="contact" className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Contact" />

          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" className="bg-red-800 text-yellow-300 px-4 mr-50 rounded">Clear Entries</button>
            <button type="submit" className="bg-red-800 text-yellow-300 px-4 py-2 rounded">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}