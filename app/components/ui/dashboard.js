"use client"
import React, { useContext, useEffect, useState } from "react"
import { dashboardContext } from "@/app/providers/dashboardProvider"

import { RiGraduationCapFill } from "react-icons/ri"
import { SiGoogleforms } from "react-icons/si"
import { GiOpenFolder } from "react-icons/gi"
import { IoIosPersonAdd } from "react-icons/io"

const Dashboard = () => {
    const { show, showDetails } = useContext(dashboardContext)
    const [enrollDetails, setEnrollDetails] = useState([])
    const [admissionDetails, setadmissionEnrollDetails] = useState([])

    useEffect(() => {
        async function enroll() {
            const enrollStudent = await fetch("/api/registrar/dashboard/totalEnrollment");
            const data = await enrollStudent.json()
            setEnrollDetails(data)

            const admissionStudent = await fetch("/api/registrar/dashboard/totalAdmission");
            const adata = await admissionStudent.json()
            setadmissionEnrollDetails(adata)
        }
        enroll()
    }, [])

    const totalAdmission = admissionDetails.filter((s) => s.remarks === "pending")
    const totalEnrollment = enrollDetails.filter((s) => s.approve === false && s.studentID && typeof s.studentID.yearLevel === "number")
    const totalstudents = enrollDetails.filter((s) => s.approve === true)

    const grid = [
        {
            label: "For Admission",
            icon: (
                <RiGraduationCapFill className="bg-red-300 text-black text-8xl rounded-md p-2" />
            ),
            total: totalAdmission.length,
            onclick: () => showDetails(2),
        },
        {
            label: "For Enrollment",
            icon: (
                <SiGoogleforms className="bg-yellow-400 text-black text-8xl rounded-md p-2" />
            ),
            total: totalEnrollment.length,
            onclick: () => showDetails(3),
        },
        {
            label: "Total Students",
            icon: (
                <GiOpenFolder className="bg-red-600 text-black text-8xl rounded-md p-2" />
            ),
            total: totalstudents.length,
            onclick: () => showDetails(4),
        },
    ]

    const yearLevelCounts = [1, 2, 3, 4].map((year) => ({
        year,
        count: totalEnrollment.filter((s) => s.studentID.yearLevel === year).length,
    }))

    return (
        <div
            className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${
                show === 1 ? "translate-x-[0] visible" : "translate-x-[-200%]"
            }`}
        >
            <div className="bg-white p-5">
                <div className="w-[95%] min-h-8 flex items-center pl-[5%]">
                    <h1 className="text-6xl text-red-600 inline-block drop-shadow-[2px_2px_0px_#facc15]">
                        Registrar Dashboard
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-2 mt-17 mb-15 ml-12">
                    {grid.map((card, index) => (
                        <div
                            key={index}
                            onClick={card.onclick}
                            className="bg-white p-4 text-white text-center rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.35)] z-0 w-[270px] h-[120px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-100"
                        >
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 rounded-lg h-full">
                                <div className="row-span-2 flex justify-center items-center w-full h-full">
                                    {card.icon}
                                </div>
                                <div className="text-red-700 text-[17px]">{card.label}</div>
                                <div className="col-start-2 text-black text-3xl flex items-center justify-center mb-6 mr-7">
                                    {card.total}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-4 gap-10 mt-5">
                    {yearLevelCounts.map(({ year, count }) => (
                        <div
                            key={year}
                            className={`relative p-4 text-white text-center rounded-md w-[220px] h-[180px] cursor-pointer ${
                                year % 2 !== 0 ? "bg-red-600" : "bg-yellow-400"
                            } overflow-hidden`}
                        >
                            <div className="grid grid-cols-2 grid-rows-[1fr_auto_1fr] gap-3 h-full">
                                <div className="row-span-1 col-span-1 flex items-end justify-center text-4xl mr-4 mt-3">
                                    {count}
                                </div>
                                <div className="col-span-1 flex items-start justify-center text-lg ml-4 mt-3">
                                    {year}
                                    {year === 1
                                        ? "st"
                                        : year === 2
                                        ? "nd"
                                        : year === 3
                                        ? "rd"
                                        : "th"}{" "}
                                    Year
                                </div>
                                <div className="row-span-3 col-start-2 row-start-1 ml-2 flex justify-center items-center w-full h-full">
                                    <IoIosPersonAdd className="text-black text-9xl bg-transparent opacity-50 mb-4" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white py-2 flex justify-center items-center">
                                List of Enrollees
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard