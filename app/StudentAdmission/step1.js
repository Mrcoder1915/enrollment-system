import React, { useState } from "react";

export default function PersonalInformationForm() {
  const [show, setShow] = useState(true); 

  return (
    <>
      {show && (
        <div className="max-w-full bg-white rounded-4xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2 border-b-4 border-red-900 font-serif items-center rounded-t-4xl flex justify-start text-yellow-400 bg-gradient-to-t from-[#FABCBC] via-[#d16b6b] to-[#8b0606] p-2">
            <img className="w-20 h-20 mr-2" src="/neustlogo-nobg.png" alt="NEUST Logo" />
            UNIVERSITY OF SOUTHERN NUEVA ECIJA
          </h1>

          <div className="bg-red-900 text-white p-2 rounded mb-4 flex justify-around">
            <span>Applicant ID:</span>
            <span>Applicant Name:</span>
          </div>

          <p className="border-red text-sm text-black mb-4 bg-[#FABCBC] p-2 mr-30">
            1. Kindly type "NA" in boxes where there are no possible answers to the information being requested.<br />
            2. To make use of the letter 'Ñ', please press ALT while typing '165'; while for 'ñ', please press ALT while typing '164'.
          </p>


          <div class="flex items-center justify-center w-full m-4  pr-7">

<div class="flex items-center ">
  <div class="bg-[#8b0606] text-yellow-400 font-bold py-2 px-4 rounded-lg z-10">STEP 1</div>
  <div class="h-1 bg-yellow-400 w-50"></div>
</div>


<div class="flex items-center">
  <div class="bg-yellow-400 text-[#8b0606] font-bold py-2 px-4 rounded-lg z-10">STEP 2</div>
  <div class="h-1 bg-yellow-400 w-50"></div>
</div>


<div class="flex items-center">
  <div class="bg-yellow-400 text-[#8b0606] font-bold py-2 px-4 rounded-lg z-10">STEP 3</div>
  <div class="h-1 bg-yellow-400 w-50"></div>
</div>


<div class="flex items-center">
  <div class="bg-yellow-400 text-[#8b0606] font-bold py-2 px-4 rounded-lg z-10">STEP 4</div>
</div>
</div>

<div class="flex justify-evenly w-full text-m pr-7 mb-4 text-red-800">
<span>PERSONAL INFORMATION</span>
<span>FAMILY BACKGROUND</span>
<span>EDUCATIONAL ATTAINMENT</span>
<span>REQUIREMENTS</span>
</div>
<div className="w-[95%] h-[300px] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden  ml-6 pb-200 ">
<div className="p-6 text-xl border-b">
<p className="text-red-800">PERSONAL INFORMATION</p>
</div>

          <form className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-1 border-b pb-7 pr-190">
              <label> Campus:</label>
              <input type="text" className="border rounded " />
              <label> Department:</label>
              <input type="text" className="border rounded" />
              <label> 1st Choice:</label>
              <input type="text" className="border rounded" />
            </div>

            <div className="grid grid-cols-6 gap-4 pb-6">
              <labe>Name:</labe>
              <input type="text" placeholder="Last Name" className="border p-2 rounded" />
              <input type="text" placeholder="First Name" className="border p-2 rounded" />
              <input type="text" placeholder="Middle Name" className="border p-2 rounded" />
              <input type="text" placeholder="Extension Name" className="border p-2 rounded" />
              </div>
              <div className="grid grid-cols-4 gap-5">
              <input type="text" placeholder="LRN" className="border p-2 rounded" />
              <input type="date" placeholder="Birth Date" className="border p-2 rounded" />
              <input type="text" placeholder="Birth Place" className="border p-2 rounded" />
              <input type="text" placeholder="Citizenship" className="border p-2 rounded" />           
              <input type="text" placeholder="Religion" className="border p-2 rounded" />
              <input type="text" placeholder="Cellphone #" className="border p-2 rounded" />
              <input type="text" placeholder="Landline #" className="border p-2 rounded" />
              <input type="email" placeholder="Email Address" className="border p-2 rounded" />        
               <label className="text-sm">Gender:</label>
                <label><input type="radio" name="gender" /> Male</label>
                <label><input type="radio" name="gender" /> Female</label>      
              <input type="number" placeholder="Age" className="border p-2 rounded" />
              <input type="number" placeholder="Height (cm)" className="border p-2 rounded" />
              <input type="number" placeholder="Weight (lbs)" className="border p-2 rounded" />
              <input type="text" placeholder="Civil Status" className="border p-2 rounded" />
              </div>
              <div className="pl-230">
              <div className="w-36 h-36 border border-black flex items-center justify-center">
                  <span className="text-black">Photo</span>
                </div>
                </div>
                <div className="pl-230">
                <button type="button" className="bg-red-800 text-white px-7 py-2 rounded text-sm self-center">
                  Upload Photo
                </button>
                </div>
          </form>
        </div>
        </div>
      )}
    </>
  );
}
