import React from 'react'

export default function TodoHeader() {
  return (
    <div className='text-center py-4'>
      <h1 className='text-secondary my-2'>오늘의 할 일 (To Do List)</h1>
      <h2 className='text-primary my-2'>{new Date().toDateString()}</h2>
    </div>
  )
}
