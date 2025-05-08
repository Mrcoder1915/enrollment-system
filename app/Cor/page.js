"use client"
import dynamic from "next/dynamic"

const CorDocs = dynamic(() => import("../components/ui/CorDocs/PdfViewer"), { ssr: false })

const page = () => {
  return (
   <div className="w-full h-[100vh]">
        <CorDocs />
    </div>
  )
}

export default page
