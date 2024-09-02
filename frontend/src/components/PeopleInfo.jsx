import React from "react";
import { Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { selectContactAtom } from "../store/store";
import ContactProfile from "./ContactProfile";

const PeopleInfo = () => {
  const selectedContact = useRecoilValue(selectContactAtom);

  return (
    <div className="bg-gray-50 p-3 rounded-xl flex justify-between shadow-lg">
      <div className="flex items-center">
        <Avatar sx={{ bgcolor: "#1f2937", color: "#fff", fontSize: "1.2rem" }}>
          {selectedContact.username[0]}
        </Avatar>
        <div className="flex flex-col ml-3">
          <h1 className="text-md font-semibold text-gray-700">
            {selectedContact.username}
          </h1>
          <h1 className="text-sm text-gray-500">
            {selectedContact.digitalNumber}
          </h1>
        </div>
      </div>
      <div className="flex space-x-3 items-center">
        <ContactProfile />
        {/* <button className="text-white text-sm py-2 px-7 transition-transform duration-200 ease-in-out hover:scale-105 bg-black rounded-3xl shadow-md hover:bg-gray-800">
          Call
        </button> */}
      </div>
    </div>
  );
};

export default PeopleInfo;
