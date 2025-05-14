"use client";

import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

export default function StudentAdmission() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/Student/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      const result = await res.json();
      if (res.ok) { 
        alert("Admission submitted successfully!");
        // Reset or redirect logic can go here
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 flex-col gap-4 p-6">
      {currentStep === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
      {currentStep === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
      {currentStep === 3 && <Step3 formData={formData} updateFormData={updateFormData} />}
      {currentStep === 4 && <Step4 formData={formData} updateFormData={updateFormData} />}

      <div className="flex justify-between mt-6 w-full max-w-xl">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white px-6 py-2 rounded"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-red-800 text-white px-6 py-2 rounded ml-auto"
        >
          {currentStep < 4 ? "Continue" : "Submit"}
        </button>
      </div>
    </div>
  );
}
