"use client"
import React, { createContext, useMemo, useState, useEffect } from 'react'
import Fetch from "../lib/fetch/fetchRefreshToken"

export const dashboardContext = createContext(null);

const dashboardProvider = ({children}) => {
    const [show, setShow] = useState(1)
    const [view, setView] = useState(null)
    const [userAccess, setUserAccess] = useState(null)
    const [insertInfo, setInsertInfo] = useState([])
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
    setView(null)
    setInsertInfo([])
}
const SetView = (In) => {
  setView(prev => prev = In)
}
const value = useMemo(() => ({  
    show,
    showDetails,
    userAccess,
    view,
    SetView,
    setInsertInfo,
    insertInfo
}),[show,setShow,showDetails,SetView,setInsertInfo,view,insertInfo])
  return (
    <dashboardContext.Provider value = {value}>
        {children}
    </dashboardContext.Provider>
  )
}

export default dashboardProvider
