import React from 'react'

export default function FieldContainer({children, className}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {children}
    </div>
  )
}
