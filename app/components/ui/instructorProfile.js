"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { dashboardContext } from '@/app/providers/dashboardProvider';

const ProfileForm = () => {
  const router = useRouter();
  const { show } = useContext(dashboardContext); // 👈 get `show` from context

  const [profile, setProfile] = useState({
    _id: "",
    program: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
  });

  useEffect(() => {
    fetch("/api/instructor/instructorProfile", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProfile(data[0]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!profile.emailAddress) {
      alert("Email is required");
      return;
    }

    try {
      const res = await fetch("/api/instructor/instructorProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error();
      router.refresh();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div
      className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${
        show === 1 ? "translate-x-[0] visible" : "translate-x-[-200%]"
      }`}
    >
      <div className="w-[95%] min-h-[45vh] mt-4 bg-white border border-gray-200 rounded-2xl shadow-2xl z-0">
        <div className="h-15 bg-tertiary flex items-center pl-4 text-white rounded-t-2xl">
          <h1 className="text-2xl font-semibold">My Profile</h1>
        </div>
        <form className="p-10 flex flex-col gap-3">
          {[
            {
              label: "Program",
              name: "program",
              type: "select",
              options: [
                "",
                "Bachelor of Science in Information Technology",
                "Bachelor of Science in Business Administration",
                "Bachelor of Secondary Education",
                "Bachelor of Science in Hospitality Management",
              ],
            },
            { label: "First Name", name: "firstName" },
            { label: "Middle Name", name: "middleName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email Address", name: "emailAddress", type: "email" },
            { label: "Contact", name: "contactNumber" },
          ].map(({ label, name, type = "text", options }) => (
            <div className="flex items-center gap-4" key={name}>
              <label className="w-[120px]">{label}:</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={profile[name]}
                  onChange={handleChange}
                  className="w-[50%] border rounded px-3 py-1.5"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt || "Select…"}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={profile[name]}
                  onChange={handleChange}
                  className="w-[50%] border rounded px-3 py-1.5"
                />
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="flex justify-end mt-4 pr-275">
        <button
          onClick={handleSubmit}
          className="btn-danger px-6 py-2 rounded-md shadow-md text-[#ffd700]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
