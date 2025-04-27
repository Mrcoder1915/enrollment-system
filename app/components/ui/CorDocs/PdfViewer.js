"use client"
import React from 'react'
import Docs from "./Cor"
import { PDFViewer } from '@react-pdf/renderer'

const PdfViewer = () => {
  return (
    <div >
    <div className='w-full h-[100vh] overflow-hidden'>
        <PDFViewer width="100%" height="842px">
            <Docs />
        </PDFViewer>
    </div>
    </div>
  )
}

export default PdfViewer
