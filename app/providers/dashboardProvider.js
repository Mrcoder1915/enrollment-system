"use client"
import React, { createContext, useMemo, useState } from 'react'

export const dashboardContext = createContext(null);

const dashboardProvider = ({children}) => {
    const [show, setShow] = useState(1)

    const userAccess = "registrar";

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
