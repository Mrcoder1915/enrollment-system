"use client"
import React, { useContext } from 'react'
import {dashboardContext} from '../providers/dashboardProvider'
import EnrollmentStatus from '../components/ui/enrollmentStatus'

const page = () => {
  const {show, userAccess} = useContext(dashboardContext);
  console.log(userAccess);
  console.log("from children: ",show)
  return (
    <div className='w-full min-h-[100vh] h-auto pt-[70px]'>
        
        {/* INSTRUCTIONS!!!

             Don't put your codes here, go to components ui folder and create files in the files you created there,
             write your code and import it here so you can see the output. Name the file related to what you are doing.

             E.g: in top of this file:
             import Dashboard from '../components/ui/dashboard'

             and define here:
             <div>
                <Dashboard />
             </div>
             
        */}
        {
          userAccess === "registrar" &&  <EnrollmentStatus /> 
        }
        
        
    </div>
  )
}

export default page
