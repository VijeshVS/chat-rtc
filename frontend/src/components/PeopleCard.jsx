import { Avatar } from '@mui/material'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { selectContactAtom } from '../store/store'

const PeopleCard = ({contact}) => {
  const setSelectedContact = useSetRecoilState(selectContactAtom);

  return (
    <div onClick={()=>setSelectedContact(contact)} className='flex space-x-2 py-5 pl-1 rounded-t-xl hover:bg-slate-50 border-b-2 cursor-pointer'>
        <Avatar>J</Avatar>
        <div className='flex flex-col'>
            <h1 className='font-bold text-sm'>{contact.username}</h1>
            <h1 className='text-sm'>{contact.digitalNumber}</h1>
        </div>
    </div>
  )
}

export default PeopleCard