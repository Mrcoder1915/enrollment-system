"use client"
import React, { createContext, useMemo, useState, useEffect } from 'react'
import Fetch from "../lib/fetch/fetchRefreshToken"

export const dashboardContext = createContext(null);

const dashboardProvider = ({children}) => {
    const [show, setShow] = useState(1)
    const [userAccess, setUserAccess] = useState(null)
    console.log("userAccess: ",userAccess)

useEffect(() => {
  const getuser = async () => {
        const user = await Fetch("api/getUser", {
        method: "GET",
      })
      const userAccess = await user.json()
      if(userAccess){
        setUserAccess(userAccess.user.role)
      }else{
        setUserAccess(null)
      }
  }
  getuser()
},[])

const showDetails = (position) => {
    setShow((prev) => prev = position)
}
const value = useMemo(() => ({  
    show,
    showDetails,
    userAccess
}),[show,setShow,showDetails])
  return (
    <dashboardContext.Provider value = {value}>
        {children}
    </dashboardContext.Provider>
  )
}

export default dashboardProvider
