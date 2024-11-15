import React from 'react'

export default function ErrorContainer({children}) {
  return (
    <div className='text-red-500'>
      {children}
    </div>
  )
}
