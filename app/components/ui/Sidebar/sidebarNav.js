"use client"
import { FaHome, FaFolderOpen, FaFile, FaFileInvoice } from "react-icons/fa";
import { GiGraduateCap, GiNotebook } from "react-icons/gi";   
import { FaUserLarge } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import {dashboardContext} from '../../../providers/dashboardProvider'
import { useContext } from "react";
import { useRouter } from "next/navigation";


 const Navigation = () => {
    const {userAccess} = useContext(dashboardContext) 
    const router = useRouter()
    const getUserView = (registrar, student, instructor) => {
        return  userAccess == "registrar"
        ? registrar
        :userAccess == "instructor"
        ? instructor
        :userAccess == "student"
        ? student
        : null
   };

   const Logout = async () => {
      try {
        const res = await fetch("/api/Logout")
        if(res.ok){
          router.push("/")
        }
      } catch (error) {
        throw new error
      }
   }

 const nav = [
         { 
           id: 1,
           icon:   <FaHome /> ,
           text:   getUserView("Dashboard", "My Profile", "My Profile")
              
          },
      
          {  
            id: 2,
            icon: getUserView(<GiGraduateCap />, <GiNotebook />, <AiFillSchedule />) ,
            text: getUserView("Admission", "Enrollment", "Schedule")
          },
          {
            id: 3,
            icon: getUserView(<GiNotebook />, <FaFile />, <FaFolderOpen />),
            text:  getUserView("Enrollment", "COR", "Student List")
          },
          {
            id: 4,
            icon: getUserView(<FaFolderOpen />, <FaFileInvoice />, <FaFile />),
            text: getUserView("Master List", "Grades", "Grade Entry")
          },
          {
             id: 5,
             icon: <FaUserLarge />,
             text: "Faculty",
             condition: getUserView(true, false, false)
          },
          {
            id: 6,
            icon: <RiShutDownLine />,
            text: "Log Out",
            onclick:  () => Logout()
          }
    ];
    return nav
}

export default Navigation