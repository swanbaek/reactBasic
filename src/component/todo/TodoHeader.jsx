import React from 'react'
import { BiSolidCalendarHeart } from "react-icons/bi";
export default function TodoHeader() {
  return (
    <div className='py-4'>
      <h1 className='text-secondary my-2'>오늘 할 일 (To Do List)</h1>
      <h2 className='text-success my-2'> <BiSolidCalendarHeart /> {new Date().toDateString()}</h2>
    </div>
  )
}
