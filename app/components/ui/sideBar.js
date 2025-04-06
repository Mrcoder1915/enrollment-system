"use client"
import React, { useContext } from 'react'
import { FaHome } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";   
import { GiNotebook } from "react-icons/gi";
import { FaFolderOpen } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { FaFile } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import {dashboardContext} from '../../providers/dashboardProvider'

const sideBar = () => {

    const {show, showDetails, userAccess} = useContext(dashboardContext) 

    console.log(userAccess)

    const getUserView = (registrar, student) =>{
      return  userAccess == "registrar"?   registrar : student;
    }
    const activeColor = (location, color ) => {
      return show == location? color : null;
    }
    
    console.log(show);
    
  return (
    <aside className='sidebar fixed bg-side  w-[270px] h-full z-10'>
        {/* this is the sidebar */}
        <div className='w-full h-[20%] flex items-center justify-center gap-2.5'> 
          <div className='w-25 h-[100px] flex items-center'>
            <img className='w-h-full' src='/neustlogo-nobg.png'/> 
          </div>
          <h1 className='text-5xl font-bold text-gradient-primary'>USNE</h1>
        </div>
          
        <div className='w-full h-[9%] flex-icenter text-3xl pl-[15%] gap-2 text-white border-y-1 border-white mb-[6%]'>
          <div className='bg-black w-10 h-10 rounded-full '>
              <img></img>
          </div>
          <h1>Registrar</h1>
        </div>

        <div className='w-full h-[65%]'>
          <ul className='side flex-column gap-2'>
            <li className={
                    `${activeColor(1, "btn-success hover:bg-[#ffd700]")}`}
                    onClick={() => showDetails(1)}>
                <i><FaHome /></i> 
                <div className={
                    `${activeColor(1, "text-[#8b0606] ")}`}
                    >{getUserView("Dashboard", "My Profile")}
                </div>
            </li >
            <li className={
                    `${activeColor(2, "btn-success hover:bg-[#ffd700]")}`}
                     onClick={() => showDetails(2)}>
                <i>{getUserView(<GiGraduateCap />, <GiNotebook />)}</i> 
                <div className={
                    `${activeColor(2, "text-[#8b0606]")}`}>
                     {getUserView("Admission", "Enrollment")}
                </div>
            </li>
            <li className={
                    `${activeColor(3, "btn-success hover:bg-[#ffd700]")}`}
                     onClick={() => showDetails(3)}>
              <i>{getUserView(<GiNotebook />, <FaFile />)}</i>
              <div className={
                    `${activeColor(3, "text-[#8b0606]")}`}>
                     {getUserView("Enrollment", "COR")}
              </div>
            </li>
            <li className={
                    `${activeColor(4, "btn-success hover:bg-[#ffd700]")}`}
                     onClick={() => showDetails(4)}>
              <i>{getUserView(<FaFolderOpen />, <FaFileInvoice />)}</i>
              <div className={
                    `${activeColor(4, "text-[#8b0606]")}`}>
                     {userAccess == "registrar"? "Master List" : "Grades"}
              </div>
            </li>
            {getUserView(
             <li className={
                     `${activeColor(5, "btn-success hover:bg-[#ffd700]")}`}
                      onClick={() => showDetails(5)}>
                <i><FaUserLarge /></i>
                <div className={
                    `${activeColor(5, "text-[#8b0606]")}`}>
                     Faculty
                </div>
             </li>, "")}
            <li className={
                    `${activeColor(6, "btn-success hover:bg-[#ffd700]")}`}
                    onClick={() => showDetails(6)}>
              <i><RiShutDownLine /></i>
              <div className={
                    `${activeColor(6, "text-[#8b0606]")}`}>
                     Log Out
              </div>
            </li>
          </ul>
        </div>
    </aside>
  )
}

export default sideBar
