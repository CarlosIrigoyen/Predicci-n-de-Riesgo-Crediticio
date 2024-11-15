import React from 'react'

export default function FormRow({children}) {
  return (
    <div className='flex justify-between items-center'>
      {children}
    </div>
  )
}
