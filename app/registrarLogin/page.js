"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

const Login = () => {
  const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, seterr] = useState(false)
    console.log(JSON.stringify({userName}))
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await fetch("api/registrar/registrarLogin", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({userName, password})
            })
            if(user.ok){
              seterr(false)

                console.log("Login Success")
                router.push("/Dashboard")
            }else{
                console.log("invalid");
                seterr(true)
            }
        } catch (error) {
            
        }
    }
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gradient-primary">
     <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registrar Portal 
        </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md h-[500px]">
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
               <img src="/logo.jpg" className="w-20"></img>
          <div className="w-full flex items-center justify-center text-info">
               <h2>UNIVERSITY OF SOUTHERN
                              NUEVA ECIJA </h2>
          </div>
            <label htmlFor="uname" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              id="uname"
              className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${err? "border-red-500":"border-gray-300"}`}
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}

              id="pass"
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${err? "border-red-500":"border-gray-300"}`}
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;