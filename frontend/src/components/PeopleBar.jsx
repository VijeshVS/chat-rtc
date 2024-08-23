import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";

import ModalComponent from './ModalComponent';

const PeopleBar = ({setFilteredContacts,contacts,setContacts}) => {
  const [searchBar,setSearchBar] = useState("");
  return (
    <div className="flex py-4 rounded-xl bg-white flex-col">
          <div className="flex space-x-4 items-center px-3">
            <h1 className="text-lg font-semibold">Chat</h1>
            <div className="flex items-center border-2 px-2 py-2 rounded-2xl border-gray-400">
              <input
                value={searchBar}
                onChange={(e)=>{
                  setSearchBar(e.target.value)
                  setFilteredContacts(contacts.filter(c=>c.username.includes(e.target.value)))
                }}
                type="text"
                placeholder="Search"
                className="focus:outline-none text-sm px-1"
              />
              <SearchIcon fontSize="small" htmlColor="#9ca3af" />
            </div>
            <ModalComponent contacts={contacts} setContacts={setContacts} />
          </div>
        </div>
  )
}

export default PeopleBar    