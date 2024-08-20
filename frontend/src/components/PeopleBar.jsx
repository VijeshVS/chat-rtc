import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const PeopleBar = () => {
  return (
    <div className="flex py-4 rounded-xl bg-white flex-col">
          <div className="flex space-x-4 items-center px-3">
            <h1 className="text-lg font-semibold">Chat</h1>
            <div className="flex items-center border-2 px-2 py-2 rounded-2xl border-gray-400">
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none text-sm px-1"
              />
              <SearchIcon fontSize="small" htmlColor="#9ca3af" />
            </div>
            <div className="bg-orange-500 rounded-2xl p-1 cursor-pointer hover:scale-105">
              <AddIcon htmlColor="white" fontSize="medium" />
            </div>
          </div>
        </div>
  )
}

export default PeopleBar    