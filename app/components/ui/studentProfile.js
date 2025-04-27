"use client";

import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const StudentProfile = ({ student }) => {
  const { show } = useContext(dashboardContext);

  const defaultStudent = {
    campus: "University of Southern Nueva Ecija",
    department: "College of Information And Communications Technology",
    lastName: "Dela Cruz",
    firstName: "Marian",
    middleName: "Pallarca",
    middleInitial: "P.",
    extensionName: "N/A",
    lrn: "10573830202",
    birthDate: "July 22, 2004",
    gender: "Female",
    age: "16",
    height: "180",
    weight: "46",
    civilStatus: "Single",
    birthPlace: "San Leonardo, Nueva Ecija",
    citizenship: "Filipino",
    religion: "Catholic",
    cellphone: "09128952629",
    landline: "None",
    email: "mau@gmail.com",
  };

  const profile = student || defaultStudent;

  return (
    <div
      className={`w-full h-[80vh] absolute flex items-start p-12 transition-all ease-in duration-300 ${
        show === 1 ? "translate-x-0 visible" : "translate-x-[-200%]"
      }`}
    >
      <div className="bg-white p-8 w-full max-w-5xl overflow-y-hidden rounded-none shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>👤</span> Personal Information
        </h2>

        <form className="space-y-6">
          {/* Campus and Department */}
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Campus" value={profile.campus} />
            <InfoField label="Department" value={profile.department} />
          </div>

          <hr className="border-t-2 border-black my-4" />

          {/* Name Fields */}
          <div className="grid grid-cols-5 gap-4">
            <InfoField label="Last Name" value={profile.lastName} />
            <InfoField label="First Name" value={profile.firstName} />
            <InfoField label="Middle Name" value={profile.middleName} />
            <InfoField label="Middle Initial" value={profile.middleInitial} />
            <InfoField label="Extension Name" value={profile.extensionName} />
          </div>

          {/* LRN, Birth Date, Gender */}
          <div className="grid grid-cols-3 gap-4">
            <InfoField label="LRN" value={profile.lrn} />
            <InfoField label="Birth Date" value={profile.birthDate} />
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Gender</label>
              <div className="flex items-center gap-6 p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.gender === "Female"}
                    disabled
                  />
                  <span>Female</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.gender === "Male"}
                    disabled
                  />
                  <span>Male</span>
                </div>
              </div>
            </div>
          </div>

          {/* Age, Height, Weight, Civil Status */}
          <div className="grid grid-cols-4 gap-4">
            <InfoField label="Age" value={profile.age} />
            <InfoField label="Height (cm)" value={profile.height} />
            <InfoField label="Weight (lbs)" value={profile.weight} />
            <InfoField label="Civil Status" value={profile.civilStatus} />
          </div>

          {/* Birth Place and Citizenship */}
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Birth Place" value={profile.birthPlace} />
            <InfoField label="Citizenship" value={profile.citizenship} />
          </div>

          {/* Religion, Cellphone, Landline */}
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Religion" value={profile.religion} />
            <div className="grid grid-cols-2 gap-4">
              <InfoField label="Cellphone #" value={profile.cellphone} />
              <InfoField label="Landline #" value={profile.landline} />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <InfoField label="Email Address" value={profile.email} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;

const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <input
      type="text"
      value={value || "-"}x
      disabled
      className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
    />
  </div>
);
