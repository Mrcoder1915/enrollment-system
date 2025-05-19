"use client"
import React, { useContext } from 'react'
import {dashboardContext} from '../providers/dashboardProvider'
import EnrollmentStatus from '../components/ui/enrollment-status/enrollmentStatus'
import FacultyAccount from '../components/ui/instructorList'
import Dashboard from '../components/ui/dashboard'
import GradeEntry from '../components/ui/GradeEntry'
import StudentList from '../components/ui/StudentList'
import GradeView from '../components/ui/GradeView'
import EnrollmentForm from '../components/ui/EnrollmentForm'
import InstructorSchedule from "../components/ui/instructorSchedule"
import AdmissionTable from '../components/ui/admission'
import StudentProfile from '../components/ui/studentProfile'
import ProfileForm from '../components/ui/instructorProfile'
import MasterList from '../components/ui/master-list/masterlist'
import ViewDocs from "@/app/components/ui/enrollment-status/View"

const page = () => {
  const { userAccess } = useContext(dashboardContext);

  return (
    <div className='w-full min-h-[100vh] overflow-hidden h-auto pt-[70px] relative'>
        
        {
          userAccess === "registrar" && <>
               <Dashboard />
               <AdmissionTable />               
               <EnrollmentStatus />
               <MasterList />
               <ViewDocs />
               <FacultyAccount />
           </>
        }
        
        {
           userAccess === "instructor" && <>
                <GradeEntry />
                <StudentList />
                <InstructorSchedule />
                <ProfileForm />
             </>
        } 
        
        {
          userAccess === "student" && <>
              <GradeView />
              <EnrollmentForm />
              <StudentProfile />
            </>
        }
        
    </div>
  )
}

export default page
