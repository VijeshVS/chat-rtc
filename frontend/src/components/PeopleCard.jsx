import { Avatar } from '@mui/material'
import React from 'react'

const PeopleCard = () => {
  return (
    <div className='flex space-x-2 py-5 pl-1 rounded-t-xl hover:bg-slate-50 border-b-2 cursor-pointer'>
        <Avatar>J</Avatar>
        <div className='flex flex-col'>
            <h1 className='font-bold text-sm'>Jivesh</h1>
            <h1 className='text-sm'>Have a good day sir!</h1>
        </div>
    </div>
  )
}

export default PeopleCard