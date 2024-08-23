import React from 'react'
import { Avatar } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { selectContactAtom } from '../store/store';

const PeopleInfo = () => {

  const selectedContact = useRecoilValue(selectContactAtom);

  return (
    <div className="bg-white p-4 rounded-xl flex justify-between">
    <div className="flex">
      <Avatar>{selectedContact.username[0]}</Avatar>
      <div className="flex flex-col ml-2">
        <h1 className="text-sm font-bold">{selectedContact.username}</h1>
        <h1 className="text-sm text-gray-400">{selectedContact.digitalNumber}</h1>
      </div>
    </div>
    <div className="flex space-x-2">
      <button className="text-black text-sm py-2 px-5 font-semibold hover:scale-105 bg-white border-2 border-gray-400 rounded-3xl">
        Profile
      </button>
      <button className="text-white text-sm py-2 px-7 hover:scale-105 bg-black rounded-3xl">
        Call
      </button>
    </div>
  </div>
  )
}

export default PeopleInfo