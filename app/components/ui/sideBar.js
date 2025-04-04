"use client"
import React, { useContext } from 'react'
import {dashboardContext} from '../../providers/dashboardProvider'

const sideBar = () => {
    const {show, showDetails} = useContext(dashboardContext)

    
  return (
    <aside className='sidebar fixed bg-red-500  w-[300px] h-full'>
        {/* this is the sidebar */}
        <h1 className='text-white text-5xl'>{show}</h1>
        <button className=' text-3xl' onClick={() => showDetails(1)}>Dashboard</button><br></br>
        <button className='text-3xl' onClick={() => showDetails(2)}>teachers</button>
    </aside>
  )
}

export default sideBar
