import React from 'react'

export default function FieldContainer({children}) {
  return (
    <div className='flex flex-col gap-1'>
      {children}
    </div>
  )
}
