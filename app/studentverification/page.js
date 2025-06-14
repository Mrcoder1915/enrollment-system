'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardProviderVerification() {
  const router = useRouter()
  const [check,setChecked] = useState(false)
  const [firstName ,setfirstName] = useState("")
  const [lastName ,setlastName] = useState("")
  const [emailAddress ,setemailAddress] = useState("")
  const [loading, setLoading] = useState(false)
  
console.log(firstName);
console.log(lastName);



 async function student(e){
  e.preventDefault()
    setLoading(true)
     const result=await fetch("/api/Student/studentverification",{
      method:"POST",
      headers:{
        "Content-Type":"application/json" 
      },
      body: JSON.stringify({firstName:firstName,lastName:lastName,emailAddress:emailAddress})
    })
    if(result.ok){
      await fetch("/api/Student/otpverify",{
        method:"POST",
        headers:{
          "Content-Type":"application/json" 
        },
        body: JSON.stringify({Email:emailAddress})
      })
      setLoading(false)
      router.push("/otp")
      console.log("ok")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-fixed from-red-700 to-gray-100 p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">Profile Verification</h1>
      
      <div className="bg-auto bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/USNE.png" className="mx-auto w-24 my-2" />
          <p className="text-red-800 font-bold text-md leading-tight">
            UNIVERSITY OF SOUTHERN<br />NUEVA ECIJA
          </p>
        </div>
        <form onSubmit={student} className="text-sm">
          <label className="font-semibold block mt-2">Last Name:</label>
          <input type="text" onChange={(e)=>setlastName(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Last Name" />

          <label className="font-semibold block mt-2">First Name:</label>
          
          <input type="text" name="firstName"
          onChange={(e) => setfirstName(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="First Name" />

          <label className="font-semibold block mt-2">Middle Name:</label>
          <input type="text"  disabled={check}  className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Middle Name" />
          
          <label className="block mt-1">
            <input type="checkbox"  checked={check} onChange={() => setChecked(prev => !prev)} className="mr-2" />
            I don't have a middle name.
          </label>

          <label className="font-semibold block mt-2">Email Address:</label>
          <input type="email"  onChange={(e)=>setemailAddress(e.target.value)} className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Email Address" />

          <label className="font-semibold block mt-2">Contact:</label>
          <input type="number" maxLength={11} name="contact" className="w-full p-2 mt-1 border border-black-400 rounded" placeholder="Contact" />

          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" className="bg-red-800 text-yellow-300 px-4 mr-50 rounded">Clear Entries</button>
            <button type="submit" className="bg-red-800 text-yellow-300 px-4 py-2 rounded">

                 {loading? <div role="status">
          <svg aria-hidden="true" className="w-[50px] h-6 text-gray-200 animate-spin dark:text-green-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>: "Continue"}
          

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}