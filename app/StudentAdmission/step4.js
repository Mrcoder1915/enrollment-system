import React from "react";

export default function RequirementsForm() {
  return (
    <div className="max-w-full bg-white rounded-4xl shadow-lg p-10">
    <h1 className="text-2xl font-bold mb-2 border-b-4 border-red-900 font-serif items-center rounded-t-4xl flex justify-start text-yellow-400 bg-gradient-to-t from-[#FABCBC] via-[#d16b6b] to-[#8b0606] p-2 ">
    <img className='w-27 h-27 mr-2' src='/neustlogo-nobg.png'/> UNIVERSITY OF SOUTHERN NUEVA ECIJA
      </h1>
      <div className="bg-red-900 text-white  p-2 rounded mb-4 flex justify-around ">
         <span>Applicant ID:</span>
         <span>Applicant Name:</span>
      </div>

      <p className="border-red text-sm text-black mb-4 bg-[#FABCBC] p-2 mr-30">
        1. Kindly type "NA" in boxes where there are no possible answers to the information being requested.<br />
        2. To make use of the letter 'Ñ', please press ALT while typing '165'; while for 'ñ', please press ALT while typing '164'.
      </p>

      <div class="flex items-center justify-center w-full m-4  pr-7">

<div class="flex items-center ">
  <div class="bg-yellow-400 text-[#8b0606] font-bold py-2 px-4 rounded-lg z-10">STEP 1</div>
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
  <div class="bg-[#8b0606] text-yellow-400 font-bold py-2 px-4 rounded-lg z-10">STEP 4</div>
</div>
</div>

<div class="flex justify-evenly w-full text-m pr-7 mb-4 text-red-800">
<span>PERSONAL INFORMATION</span>
<span>FAMILY BACKGROUND</span>
<span>EDUCATIONAL ATTAINMENT</span>
<span>REQUIREMENTS</span>
</div>
<div className="w-[95%] h-[300px] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden  ml-6 p-7">
<div className="pb-5 text-red-800 text-xl border-b border-gray-400 p-2">
<p>REQUIREMENTS</p>
</div>

      {/* Requirements Upload */}
      <form className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-red-800 mb-4">DOCUMENTS</h2>
          <div className="space y-4 p-7">
            <div className="grid grid-cols-5 gap-3 pb-3">
              <label>Certificate of Good Moral:</label>
              <input type="file" className="border rounded" />
            </div>
            <div className="grid grid-cols-5 gap-3">
              <label>Form 138:</label>
              <input type="file" className="border rounded" />
            </div>
            <div className="grid grid-cols-5 gap-3 pt-3">
              <label>Birth Certificate:</label>
              <input type="file" className="border rounded" />
            </div>
          </div>
        </div>

      </form>
    </div>
    </div>
  );
}