"use client";
import React, { useContext } from "react";
import { dashboardContext } from "../../../providers/dashboardProvider";
import sideBarNav from "./sidebarNav";

const Sidebar = () => {
  const { show, showDetails, user } = useContext(dashboardContext);
  const nav = sideBarNav();

  // Wait for user info
  if (!user) return null;

  const activeColor = (location, color) =>
    show === location ? color : null;

  const displayRole =
    user.role === "registrar"
      ? "Registrar"
      : user.role === "instructor"
      ? "Instructor"
      : "Student";

  return (
    <aside className="sidebar fixed bg-side w-[270px] h-full z-10">
      {/* logo */}
      <div className="w-full h-[20%] flex items-center justify-center gap-2.5">
        <div className="w-25 h-[100px] flex items-center">
          <img className="w-h-full" src="/usneLogo.png" alt="Logo" />
        </div>
        <h1 className="text-5xl font-bold text-gradient-primary">USNE</h1>
      </div>

      {/* profile */}
      <div className="w-full h-[9%] flex-icenter text-3xl pl-[15%] gap-3 text-white border-y-1 border-white mb-[6%]">
        <div className="bg-black w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.image || "/default-profile.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-none">{user.fullName}</span>
          <span className="text-sm leading-none">{displayRole}</span>
        </div>
      </div>

      {/* nav items */}
      <div className="w-full h-[65%]">
        <ul className="side flex-column gap-2">
          {nav.map((item, index) => {
            if (item.condition === false) return null;
            return (
              <li
                key={index}
                className={`${activeColor(
                  item.id,
                  "btn-success hover:bg-[#ffd700]"
                )}`}
                onClick={() => {
                  showDetails(item.id);
                  if (item?.onclick) item.onclick();
                }}
              >
                <i>{item.icon}</i>
                <div
                  className={`${activeColor(item.id, "text-[#8b0606] ")}`}
                >
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

export default Sidebar;