"use client"
import React, { useContext } from 'react'
import {dashboardContext} from '../providers/dashboardProvider'
import EnrollmentStatus from '../components/ui/enrollment-status/enrollmentStatus'
import FacultyAccount from '../components/ui/facultyAccounts'
import GradeEntry from '../components/ui/GradeEntry'

const page = () => {
  const { userAccess} = useContext(dashboardContext);

  return (
    <div className='w-full min-h-[100vh] h-auto pt-[70px] relative'>
        
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
          userAccess === "registrar" && <>
               <EnrollmentStatus />
               <FacultyAccount />
           </>
        }
        
        {
           userAccess === "instructor" && <>
                <GradeEntry />
             </>
        } 
        
        {
          userAccess === "student" && <>
          
            </>
        }
        
    </div>
  )
}

export default page
