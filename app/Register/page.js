"use client";
import React from "react";

import { FaUserLarge } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gradient-primary">
     <h1 className="text-2xl font-bold text-white text-center text-gray-800 mb-6">
          Registration Portal
        </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-[30px] h-[500px] shadow-[0_0_15px_rgba(0,0,0,0.50)]">
        
        <form className="space-y-4">
          <div>
               <img src="/logo.jpg" className="w-20"></img>

          <div className="w-full flex items-center justify-center text-info">
               <h2 className="mt-30 text-3xl text-red-600 drop-shadow-[2px_2px_0px_#facc15]">UNIVERSITY OF SOUTHERN NUEVA ECIJA </h2>
          </div>
            <input
              type="text"
              id="uname"
              className="mt-5 block w-full px-4 py-2 border-2 border-red-300 rounded-[50px] shadow-sm focus:outline-none focus:border-red-700"
              placeholder="Username"
            />
            {/* <FaUserLarge className="flex inline-block text-gray-500"/> */}
          </div>

          <div>
            <input
              type="password"
              id="pass"
              className="mt-1 block w-full px-4 py-2 border-2 border-red-300 rounded-[50px] shadow-sm focus:outline-none focus:border-red-700"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between mt-6 ml-[135px]">
            <button
              type="button"
              className="px-4 py-2 w-30 bg-red-700 border-2 border-yellow-400 text-yellow-500 text-2xl rounded-md hover:bg-red-500"
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