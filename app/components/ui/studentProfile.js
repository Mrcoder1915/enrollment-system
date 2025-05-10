"use client";

import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";
import { FaUserLarge } from "react-icons/fa6";

import { useState, useEffect} from "react";

const Studentuser = () => {
  const { show } = useContext(dashboardContext);
  
  const [user, setuser]=useState(null)

useEffect( () => {
  const showdata = async ()=>{
    try{
      const response=await fetch('http://localhost:3000/api/Student/studentprofile', {
        method: 'GET' 
      })
      const data= await response.json();
      setuser(data[0]);
    } catch (error){console.log(error)}
  }

  showdata()
}, [])


console.log (user)


if(!user) {
  return;
}

  return (
    <div
      className={`w-full h-full absolute flex justify-center items-start p-8 transition-all ease-in duration-300 ${
        show === 1 ? "translate-x-0 visible" : "translate-x-[-200%]"
      }`}
    >
      
      <div className=" h-full relative w-full bg-white p-10 shadow-[0_0_20px_rgba(0,0,0,1.50)] z-0 w-[270px] overflow-auto">

        {/* Title */}
        <FaUserLarge className="text-6xl flex inline-block  text-gray-400" />
        <h2 className="flex inline-block text-3xl font-bold text-[#a70505] ml-[10px] mb-6 flex items-center gap-2">
          PERSONAL INFORMATION
        </h2>
        <hr className="border-t-2 border-black my-6 mt-8  mb-7" />

        {/* Campus and Department (unchanged) */}
        <div className="flex-col flex gap-15 mb-8 gap-[13px]">
          <div className="flex flex-row items-left gap-15 ">
            <p>Campus:</p>
            <input
              type="text" readOnly
              placeholder="Campus"
              value={user.campus}
              className="px-0 py-0 w-80 border border-gray-400 h-9 text-md pl-2 text-black rounded-sm"
            />
          </div>

          <div className="flex flex-row items-left gap-8">
            <p>Department:</p>
            <textarea readOnly
              placeholder="Department"
              value={user.department}
              className="px-0 py-0 w-80 border border-gray-400 pl-2 h-13 text-md text-black rounded-sm resize-none"
            />
          </div>
        </div>

        <hr className="border-t-2 border-black my-6 mt-13" />

        {/* Name Fields (unchanged) */}
        <div className="flex gap-15 mb-8">
          <div className="w-[50px]">
            <p>Name:</p>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"readOnly
              placeholder="Last Name"
              value={user.lastName}
              className="px-2 py-2 w-80 border border-gray-400 h-9 text-md text-black rounded-sm"
            />
            <label className="mt-2 text-black-600 text-m text-center">Last Name</label>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"readOnly
              placeholder="First Name"
              value={user.firstName}
              className="px-3 py-2 w-65 border border-gray-400 h-9 text-md text-black rounded-sm"
            />
            <label className="mt-2 text-black-600 text-m text-center">First Name</label>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"readOnly
              placeholder="Middle Name"
              value={user.middleName}
              className="px-3 py-2 w-48 border border-gray-400 h-9 text-md text-black rounded-sm"
            />
            <label className="mt-2 text-black-600 text-m text-center">Middle Name</label>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"readOnly
              placeholder="Middle Initial"
              value={user.middleInitial}
              className="px-3 py-2 w-30 border border-gray-400 h-9 text-md text-black rounded-sm"
            />
            <label className="mt-2 text-black-600 text-m text-center">Middle Initial</label>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"readOnly
              placeholder="Extension Name"
              value={user.extensionName}
              className="px-3 py-2 w-40 border border-gray-400 h-9 text-md text-black rounded-sm"
            />
            <label className="mt-2 text-black-600 text-m text-center">Extension Name</label>
          </div>
        </div>

        {/* FROM HERE: Adjust the layout to better fit inside the form */}

       <div className="flex gap-20">
        <div className="flex flex-col mb-8">
        
          <div className="flex flex-row gap-15 mb-5">
            <p>LRN:</p>
            <input
              type="text"readOnly
              placeholder="LRN"
              value={user.lrn}
              className=" px-0 py-0 pl-2 w-58 h-8 border border-gray-400 text-black-600 text-md text-black rounded-sm"
            
          />
          </div>
          
        
          <div className="flex flex-row gap-6 mb-5">
            <p>BirthDate:</p>
            <input
              type="text"readOnly
              placeholder="BirthDate"
              value={user.birthDate}
              className="px-0 py-0 w-58 pl-2 h-8 border border-gray-400 text-black-600 text-md text-black rounded-sm"
            />

          </div>
          <div className="flex flex-row gap-5.5 mb-5">
            <p>Birthplace:</p>
            <input
              type="text"readOnly
              placeholder="BirthPlace"
              value={user.birthPlace}
              className="px-0 py-0 w-58 pl-2 h-8 border border-gray-400 text-black-600 text-md text-black rounded-sm resize-none "
            
          />
          </div>
          <div className="flex flex-row gap-4.5 mb-5">
            <p>Citizenship:</p>
            <input
              type="text"readOnly
              placeholder="Citizenship"
              value={user.citizenship}
              className="px-0 py-0 w-58 pl-2 border h-8 border-gray-400 text-black-600 text-md text-black rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-27 mb-5">
            <p>Religion:</p>
            <input
              type="text"readOnly
              placeholder="Religion"
              value={user.religion}
              className="px-0 py-0 w-40 pl-2 border h-8 border-gray-400 text-black-600 text-md text-black rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-3 mb-5">
            <p>Cellphone #:</p>
            <label htmlFor="N/A">N/A</label>
            <input id="N/A" type="checkbox"></input>
            <input
              type="text"readOnly
              placeholder="Cellphone#"
              value={user.cellphone}
              className="px-0 py-0 w-40 border h-8 border-gray-400 text-md text-black-600 pl-2 rounded-md"
            
          />
        
          </div>
          <div className="flex flex-row gap-4 mb-5">
            <p>Landline #:</p>
            <label htmlFor="N/A1">N/A</label>
            <input id="N/A1" type="checkbox"></input>
            <input
              type="text"readOnly
              placeholder="Landline#"
              value={user.landline}
              className="px-0 py-0 w-40 border h-8 border-gray-400 text-md text-black-600 pl-2 rounded-md"
            
          />
          </div>
          
          </div>

          <div className="flex flex-col mt-10">

          <div className="flex gap-12 mb-4 pl-12 h-8">
            <p>Gender:</p>
              <label className="flex items-center gap-2 text-md">
                <input type="radio" disabled checked={user.gender === "Male"} /> Male
              </label>
              <label className="flex items-center gap-2 text-md">
                <input type="radio" disabled checked={user.gender === "Female"} /> Female
              </label>
            </div>
           
            <div className="flex-alignleft flex flex-row pl-18 gap-12 mb-5">
            <p>Age:</p>
          <input
              type="text"readOnly
              placeholder="Age"
              value={user.age}
              className="px-0 py-0 w-40 border border-gray-400 h-8 text-md text-black-600 pl-2 rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-11.5 mb-5 pl-4">
            <p>Height: (cm):</p>
          <input
              type="text"readOnly
              placeholder="Height(cm)"
              value={user.height}
              className="px-0 py-0 w-40 border border-gray-400 h-8 text-md text-black-600 pl-2 rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-11 mb-5 pl-4">
            <p>Weight: (lbs):</p>
          <input
              type="text"readOnly
              placeholder="Weight(lbs)"
              value={user.weight}
              className="px-0 py-0 w-40 border border-gray-400 h-8 text-md text-black-600 pl-2 rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-11 mb-5 pl-7">
            <p>Civil status:</p>
          <input
              type="text"readOnly
              placeholder="Civil Status"
              value={user.civilStatus}
              className="px-0 py-0 w-40 border border-gray-400 text-md h-8 text-black-600 pl-2 rounded-sm"
            
          />
          </div>
          <div className="flex flex-row gap-10.5 mb-5 pl-4">
            <p>Email Adress:</p>
          <input
              type="text"readOnly
              placeholder="Email Address"
              value={user.email}
              className="px-0 py-0 w-60 border border-gray-400 text-md h-8 text-black-600 pl-2 rounded-sm"
            
          />
          </div>




          </div>
          </div>
        
      </div>
    </div>
  );
};

export default Studentuser;



