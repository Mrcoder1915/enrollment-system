"use client";
import React from "react";

<<<<<<< HEAD
import { FaUserLarge } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";

const Login = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gradient-primary">
     <h1 className="text-2xl font-bold text-white text-center text-gray-800 mb-6">
          Registration Portal
      </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-[30px] h-[500px] shadow-[0_0_15px_rgba(0,0,0,0.50)]">
        
        <form className="space-y-4">
          <img src="/logo.jpg" className="w-20"></img>
          <div className="w-full flex items-center justify-center text-info">
             <h2 className="mt-30 text-3xl text-red-600 drop-shadow-[2px_2px_0px_#facc15]">UNIVERSITY OF SOUTHERN NUEVA ECIJA
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
=======
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gradient-primary">
     <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registration Portal
        </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md h-[500px]">
        
        <form className="space-y-4">
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
              id="uname"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="pass"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> master
              placeholder="Password"
            />
          </div>

<<<<<<< HEAD
          <div className="flex justify-between w-25 mt-6 ml-[140px] shadow-lg drop-shadow-[1px_1px_1px_yellow]">
            <button
              type="button"
              className="relative w-25 h-12 bg-red-700 border-2 border-yellow-400 text-yellow-500 text-[23px] rounded-md hover:bg-red-500"
=======
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
>>>>>>> master
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