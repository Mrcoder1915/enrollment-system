"use client"
import React from 'react'
import SideBar from '../components/ui/sideBar'
import DashboardProvider from '../providers/dashboardProvider'

const layout = ({children}) => {
  return (
    // this is for dashboard layout dont touch this code!!!
    <DashboardProvider>
        <div className='layout'>
            <SideBar />
            <div className='main bg-red-300'>
                {children}
            </div>
        </div>
    </DashboardProvider>
  )
}

export default layout
