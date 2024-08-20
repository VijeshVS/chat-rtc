import React from 'react'
import { Avatar } from "@mui/material";

const PeopleInfo = () => {
  return (
    <div className="bg-white p-4 rounded-xl flex justify-between">
    <div className="flex">
      <Avatar>V</Avatar>
      <div className="flex flex-col ml-2">
        <h1 className="text-sm font-bold">Vijesh Shetty</h1>
        <h1 className="text-sm text-gray-400">Online</h1>
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