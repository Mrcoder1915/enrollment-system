"use client";
import React, { useContext, useEffect, useState } from "react";
import { dashboardContext } from "../../../providers/dashboardProvider";
import sideBarNav from "./sidebarNav";

const SideBar = () => {
  const { show, showDetails, userAccess } = useContext(dashboardContext);
  const nav = sideBarNav();

  const activeColor = (location, color) => {
    return show == location ? color : null;
  };

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("female"); // Default gender is female

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await fetch("/api/instructor/myProfile", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const { firstName, middleName, lastName, gender } = data[0];
          const name = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, " ").trim();
          setFullName(name);
          // Set gender if available in the response
          setGender(gender || "female");
        }
      } catch (err) {
        console.error("Failed to fetch name:", err);
      }
    };

    if (userAccess === "instructor") {
      fetchName();
    }
  }, [userAccess]);

  return (
    <aside className="sidebar fixed bg-side w-[270px] h-full z-10">
      {/* Logo */}
      <div className="w-full h-[20%] flex items-center justify-center gap-2.5">
        <div className="w-25 h-[100px] flex items-center">
          <img className="w-h-full" src="/neustlogo-nobg.png" alt="Logo" />
        </div>
        <h1 className="text-5xl font-bold text-gradient-primary">USNE</h1>
      </div>

      {/* Role and Full Name */}
      <div className="w-full h-[9%] flex flex-col justify-center pl-[10%] gap-1 text-white border-y-1 border-white mb-[6%]">
        <div className="flex items-center gap-2 text-3xl">
          {/* Conditionally render the image based on gender */}
          <img
            src={gender === "male" ? "/male.jfif" : "/female.jfif"}
            className="bg-black w-10 h-10 rounded-full"
            alt="Profile"
          />
          <h3 className="text-xl font-bold text-gradient-primary">
            {userAccess === "registrar"
              ? "Registrar"
              : userAccess === "instructor"
              ? fullName || "Instructor"
              : "Student"}
          </h3>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full h-[65%]">
        <ul className="side flex-column gap-2">
          {nav.map((item) => {
            if (item.condition === false) return null;
            return (
              <li
                key={item.id}
                className={`${activeColor(item.id, "btn-success hover:bg-[#ffd700]")}`}
                onClick={() => showDetails(item.id)}
              >
                <i>{item.icon}</i>
                <div className={`${activeColor(item.id, "text-[#8b0606] ")}`}>
                  {item.text}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
