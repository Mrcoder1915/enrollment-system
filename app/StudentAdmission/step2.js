import React from "react";

export default function PersonalInformationForm() {
  return (
    <div className="max-w-full bg-white rounded-4xl shadow-lg">
      <header className="text-2xl font-bold mb-2 border-b-4 border-red-900 font-serif flex items-center text-yellow-400 bg-gradient-to-t from-[#FABCBC] via-[#d16b6b] to-[#8b0606] p-2 rounded-t-4xl">
        <img className="w-10 h-10 mr-2" src="/neustlogo-nobg.png" alt="NEUST Logo" />
        UNIVERSITY OF SOUTHERN NUEVA ECIJA
      </header>

      <div className="bg-red-900 text-white p-2 rounded mb-4 flex justify-around">
        <span>Applicant ID:</span>
        <span>Applicant Name:</span>
      </div>

      <p className="text-sm text-black mb-4 bg-[#FABCBC] p-2">
        1. Kindly type "NA" in boxes where there are no possible answers to the information being requested.<br />
        2. To make use of the letter 'Ñ', please press ALT while typing '165'; while for 'ñ', please press ALT while typing '164'.
      </p>

      <Stepper currentStep={2} />

      <SectionTitle>FAMILY BACKGROUND</SectionTitle>

      <form className="space-y-8 p-4">
        {["FATHER", "MOTHER", "GUARDIAN"].map((role, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold text-red-800 mb-2">{role}</h2>
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              {["Name", "Complete Address", "Contact No.", "Highest Education", "Occupation", "Income Salary"]
                .concat(role === "GUARDIAN" ? ["Relationship"] : [])
                .map((field, i) => (
                  <React.Fragment key={i}>
                    <label>{field}:</label>
                    <input type="text" className="border rounded px-2 py-1" />
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}

function Stepper({ currentStep }) {
  const steps = ["STEP 1", "STEP 2", "STEP 3", "STEP 4"];
  const titles = ["PERSONAL INFORMATION", "FAMILY BACKGROUND", "EDUCATIONAL ATTAINMENT", "REQUIREMENTS"];

  return (
    <>
      <div className="flex items-center justify-center w-full m-4 pr-7">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`flex items-center`}>
              <div className={`py-2 px-4 rounded-lg z-10 font-bold ${
                currentStep === index + 1
                  ? "bg-[#8b0606] text-yellow-400"
                  : "bg-yellow-400 text-[#8b0606]"
              }`}>
                {step}
              </div>
              {index < steps.length - 1 && <div className="h-1 bg-yellow-400 w-30"></div>}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-evenly w-full text-sm pr-7 mb-4 text-red-800">
        {titles.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="w-[95%] border-collapse shadow-md overflow-hidden m-5 p-4">
      <div className="pb-5 text-red-800 text-xl border-b-2">
        <p>{children}</p>
      </div>
    </div>
  );
}