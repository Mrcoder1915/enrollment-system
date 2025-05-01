"use client"
import React, { useContext } from 'react'
import {dashboardContext} from '../providers/dashboardProvider'
import EnrollmentStatus from '../components/ui/enrollment-status/enrollmentStatus'
import FacultyAccount from '../components/ui/facultyAccounts'
import Dashboard from '../components/ui/dashboard'
import GradeEntry from '../components/ui/GradeEntry'
import StudentList from '../components/ui/StudentList'
import GradeView from '../components/ui/GradeView'
import EnrollmentForm from '../components/ui/EnrollmentForm'
import InstructorSchedule from "../components/ui/instructorSchedule"
import AdmissionTable from '../components/ui/admission'

import MasterList from '../components/ui/master-list/masterlist'

const page = () => {
  const { userAccess } = useContext(dashboardContext);

  return (
    <div className='w-full min-h-[100vh] overflow-hidden h-auto pt-[70px] relative'>
        
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
               <Dashboard />
               <AdmissionTable />
               <EnrollmentStatus />
               <MasterList />
               <FacultyAccount />
           </>
        }
        
        {
           userAccess === "instructor" && <>
                <GradeEntry />
                <StudentList />
                <InstructorSchedule />
             </>
        } 
        
        {
          userAccess === "student" && <>
              <GradeView />
              <EnrollmentForm />
          
            </>
        }
        
    </div>
  )
}

export default page
