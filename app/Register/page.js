"use client";
import React from "react";

import { FaUserLarge } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";

const Login = () => {
  const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    console.log(JSON.stringify({userName}))
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await fetch("api/studentLogin", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({userName, password})
            })
            if(user.ok){
                console.log("Login Success")
                router.push("/Dashboard")
            }else{
                console.log("invalid");
                
            }
        } catch (error) {
            
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gradient-primary">
     <h1 className="gtext-2xl font-bold text-white text-center text-gray-800 mb-6">
          Registration Portal
      </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-[30px] h-[500px] shadow-[0_0_15px_rgba(0,0,0,0.50)]">
        
        <form className="space-y-4">
          <img src="neustlogo-nopg" className="w-20"></img>
          <div className="w-full flex items-center justify-center text-info">
             <h2 className="mt-30 text-3xl text-red-600 drop-shadow-[2px_2px_0px_#facc15] textalign = center">UNIVERSITY OF SOUTHERN NUEVA ECIJA
              </h2>
          </div>

          <div className="relative mt-5">
            <FaUserLarge className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 ml-[330px]" />
            <input
              type="text"
              className="block w-full px-4 py-2 border-2 border-red-300 rounded-[50px] shadow-md focus:outline-none focus:border-red-700"
              placeholder="Username"
            />
            
          </div>

          <div className="relative mt-5">
            <IoIosUnlock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl ml-[326px]" />
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border-2 border-red-300 rounded-[50px] shadow-md focus:outline-none focus:border-red-700"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between w-25 mt-6 ml-[140px] shadow-lg drop-shadow-[1px_1px_1px_yellow]">
            <button
              type="button"
              className="relative w-25 h-12 bg-red-700 border-2 border-yellow-400 text-yellow-500 text-[23px] rounded-md hover:bg-red-500"
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