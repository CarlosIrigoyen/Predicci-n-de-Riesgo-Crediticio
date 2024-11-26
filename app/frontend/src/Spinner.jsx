import React from 'react'
import {GuardSpinner} from "react-spinners-kit";

export default function Spinner() {
  return (
    <div className='flex items-center justify-center p-10 flex-col gap-2'>
      <GuardSpinner frontColor={"#ef4444"} backColor={"#22c55e"} size={70}/>
      <span>Calculando...</span>
    </div>
  )
}
