"use client"
import React, { createContext, useState } from 'react'

export const dashboardContext = createContext(null);

// 1. Purpose of this DashboardProvider
// The DashboardProvider is responsible for providing global state or context that is shared across the Dashboard pages
//  (e.g., user information, theme settings, etc.). Any state or data that needs to be accessed by multiple components
//  in the dashboard should be placed here.

// 2. How to Add State/Variables
// If you need to add new state, follow this pattern:

// Add a new state inside DashboardProvider.

// Use useState to initialize it.

// Add the state and its setter function to the context's value, so it can be shared across your components.

const dashboardProvider = ({children}) => {
    const [show, setShow] = useState(1)

    // if you are working on student portal you need to change the userAcess value to student
    // if you are working on registar portal you need to change the userAcess value to registar
    // FOR YOU TO SEE THE STUDENT OR REGISTAR SIDEBAR THIS IS JUST STATIC DATA UNTIL WE IMPLEMENT THE BACKEND
    const userAccess = "registrar";

const showDetails = (position) => {
    setShow((prev) => prev = position)
}
const value = {  
    show,
    showDetails,
    userAccess
}
  return (
    <dashboardContext.Provider value = {value}>
        {children}
    </dashboardContext.Provider>
  )
}

export default dashboardProvider
