"use client"
import React from 'react'
import SideBar from '../components/ui/Sidebar/sideBar'
import DashboardProvider from '../providers/dashboardProvider'

const layout = ({children}) => {
  return (
    // this is for dashboard layout dont touch this code!!!
    <DashboardProvider>
        <div className='layout'>
            <SideBar />
            <div className='main bg-white'>
                {children}
            </div>
        </div>
    </DashboardProvider>
  )
}

export default layout
