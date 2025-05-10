"use client"
import React, { useContext } from 'react'
import { dashboardContext } from '../../../providers/dashboardProvider'
import sideBarNav from './sidebarNav';

const sideBar = () => {
    const { show, showDetails, userAccess, userName, userPhoto } = useContext(dashboardContext)

    const nav = sideBarNav()

    const activeColor = (location, color) => {
        return show == location ? color : null;
    }

    return (
        <>
            {userAccess === "registrar" || userAccess === "instructor" || userAccess === "student" ?
                <aside className='sidebar fixed bg-side w-[270px] h-full z-10'>
                    {/* Sidebar Logo */}
                    <div className='w-full h-[20%] flex items-center justify-center gap-2.5'>
                        <div className='w-25 h-[100px] flex items-center'>
                            <img className='w-h-full' src='/neustlogo-nobg.png' />
                        </div>
                        <h1 className='text-5xl font-bold text-gradient-primary'>USNE</h1>
                    </div>

                    {/* User Info */}
                    <div className='w-full h-[9%] flex-icenter text-3xl pl-[15%] gap-2 text-white border-y-1 border-white mb-[6%]'>
                        <div className='bg-black w-10 h-10 rounded-full overflow-hidden'>
                            <img src={userPhoto || '/default-profile.png'} className='w-full h-full object-cover' />
                        </div>
                        <h1 className='truncate max-w-[130px]'>
                            {userName || "User"}
                        </h1>
                    </div>

                    {/* Navigation */}
                    <div className='w-full h-[65%]'>
                        <ul className='side flex-column gap-2'>
                            {nav.map((item, index) => {
                                if (item.condition === false) return null
                                return (
                                    <li key={index} className={`${activeColor(item.id, "btn-success hover:bg-[#ffd700]")}`}
                                        onClick={() => showDetails(item.id)}>
                                        <i>{item.icon}</i>
                                        <div className={`${activeColor(item.id, "text-[#8b0606] ")}`}>
                                            {item.text}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>
                : null
            }
        </>
    )
}

export default sideBar
