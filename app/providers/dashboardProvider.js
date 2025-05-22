"use client";
import React, { createContext, useMemo, useState, useEffect } from "react";
import Fetch from "../lib/fetch/fetchRefreshToken";

export const dashboardContext = createContext(null);


const DashboardProvider = ({children}) => {
    const [show, setShow] = useState(1)
    const [view, setView] = useState(null)
    const [user, setUser]     = useState(null);
    const [userAccess, setUserAccess] = useState(null)
    const [insertInfo, setInsertInfo] = useState([])
    const [studentlist, setStudentList] = useState([])
    console.log("userAccess: ",userAccess)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res  = await Fetch("api/getUser");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setUserAccess(data.user.role);
        } else {
          setUser(null);
          setUserAccess(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setUserAccess(null);
      }
    };
    getUser();
  }, []);

const showDetails = (position) => {
    setShow((prev) => prev = position)
    setView(null)
    setInsertInfo([])
}
const SetView = (In) => {
  setView(prev => prev = In)
}
const SetStudent = (students) => {
  setStudentList(students)
}
const value = useMemo(() => ({  
    show,
    showDetails,
    userAccess,
    view,
    SetView,
    setInsertInfo,
    insertInfo,
    user,
    studentlist,
    SetStudent
}),[show,setShow,showDetails,SetView,setInsertInfo,view,insertInfo,user,
  studentlist, setStudentList,SetStudent

])
  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;