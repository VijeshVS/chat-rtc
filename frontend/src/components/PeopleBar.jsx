import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddContactButton from "./AddContact";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { contactsAtom, filterContactAtom } from "../store/store";

const PeopleBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const contacts = useRecoilValue(contactsAtom);
  const setFilteredContacts = useSetRecoilState(filterContactAtom);

  return (
    <div className="flex py-4 rounded-xl bg-white shadow-md flex-col">
      
      <div className="flex space-x-4 items-center px-4">
        <h1 className="text-xl font-semibold text-gray-700">Chat</h1>
        <div className="flex items-center border border-gray-300 rounded-full shadow-sm focus-within:border-blue-500 transition-colors duration-200">
          <input
            value={searchBar}
            onChange={(e) => {
              setSearchBar(e.target.value);
              setFilteredContacts(
                contacts.filter((c) =>
                  c.username
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
            type="text"
            placeholder="Search"
            className="focus:outline-none text-sm px-3 py-2 w-56 rounded-full transition-all duration-200"
          />
          <SearchIcon fontSize="small" htmlColor="#9ca3af" className="mr-2" />
        </div>
        <AddContactButton />
      </div>
    </div>
  );
};

export default PeopleBar;
