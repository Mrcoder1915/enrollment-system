import React, { useContext } from 'react'
import {dashboardContext} from '@/app/providers/dashboardProvider'
const View = () => {
    const {show, view, insertInfo} = useContext(dashboardContext)
    
    const ViewDetails = () => {
        if(show === 3 && view === 3){
            return "translate-x-[0] visible"
        }
        return "translate-x-[-200%]"
    }
  return (
    <div 
    className={   
        `w-full h-[80vh] absolute
        flex-icenter flex-col transition-all
        ease-in duration-300
        z-20
        ${ViewDetails()}`
    }>
       <div className='w-[95%] h-64 bg-amber-300 mt-10'>
            <div className='w-full h-8 bg-tertiary flex-icenter pl-1 text-white '>
               
            </div>
             <div className='w-full h-full bg-white'>
                <table className='table w-full'>
                    <thead>
                        <tr>
                            <th>Submitted Requirments</th>
                            <th>Date Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insertInfo?.requirements?.length > 0 ? (
                insertInfo.requirements.map((req, index) => (
                  <tr key={index}>
                    <td>{req}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-gray-500">No requirements submitted</td>
                </tr>
              )}
                        
                    </tbody>
                </table>
            </div>
       </div>
    </div>
  )
}

export default View
