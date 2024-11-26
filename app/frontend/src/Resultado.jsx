import React from 'react'
import { TiWarningOutline } from "react-icons/ti";
import { FaRegThumbsUp } from "react-icons/fa6";

export default function Resultado({ prediction }) {

  const deudor = prediction === 0

  let classes = ''
  if (deudor) {
    classes = 'bg-red-100 text-red-800 border-red-500'
  } else {
    classes = 'bg-green-100 text-green-800 border-green-500'
  }

  return (
    <div className={`flex items-center gap-3 mt-8 px-6 py-4 shadow-md rounded-lg max-w-4xl mx-auto border-2 ${classes}`}>
      <div>
        {
          deudor ? <TiWarningOutline className="text-3xl inline-block mr-2" /> : <FaRegThumbsUp className="text-2xl inline-block mr-2" />
        }
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">
        La red neuronal ha identificado al cliente como posible <span className='font-bold uppercase'>{deudor ? 'deudor' : 'no deudor'}</span>.
      </p>
    </div>
  )
}
