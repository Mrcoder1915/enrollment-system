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
import EnrollmentSchedule from '../components/ui/enrollmentSchedule'
import EnrollmentCard from '@/app/components/ui/enrollmentCard'
import SelectGrade from '@/app/components/ui/SelectGrade'
import StudentListSelect from '../components/ui/StudentlistSelect'


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
                <SelectGrade />
                <GradeEntry />
                 <StudentListSelect/>
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
              <EnrollmentSchedule />
              <EnrollmentCard />
            </>
        }
        
    </div>
  )
}

export default page
