"use client";
import React, { createContext, useMemo, useState, useEffect } from "react";
import Fetch from "../lib/fetch/fetchRefreshToken";

export const dashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const [show, setShow]     = useState(1);
  const [user, setUser]     = useState(null);
  const [userAccess, setUserAccess] = useState(null);

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

  const showDetails = (position) => setShow(position);

  const value = useMemo(
    () => ({ show, showDetails, user, userAccess }),
    [show, showDetails, user, userAccess]
  );

  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;