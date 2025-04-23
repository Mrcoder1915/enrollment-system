"use client"
import { FaHome, FaFolderOpen, FaFile, FaFileInvoice } from "react-icons/fa";
import { GiGraduateCap, GiNotebook } from "react-icons/gi";   
import { FaUserLarge } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import {dashboardContext} from '../../../providers/dashboardProvider'
import { useContext } from "react";


 const Navigation = () => {
    const {userAccess} = useContext(dashboardContext) 

    const getUserView = (registrar, student, instructor) => {
        return  userAccess == "registrar"
        ? registrar
        :userAccess == "instructor"
        ? instructor
        :userAccess == "student"
        ? student
        : null
   };

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
            text: "Log Out"
          }
    ];
    return nav
}

export default Navigation