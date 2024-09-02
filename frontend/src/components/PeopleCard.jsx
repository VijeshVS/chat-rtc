import { Avatar } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectContactAtom, unReadMessagesAtom } from "../store/store";

const PeopleCard = ({ contact }) => {
  const setSelectedContact = useSetRecoilState(selectContactAtom);
  const [unRead, setUnRead] = useRecoilState(unReadMessagesAtom);

  return (
    <div
      onClick={() => setSelectedContact(contact)}
      className="flex items-center space-x-3 py-4 pl-3 justify-between pr-4 rounded-lg hover:bg-gradient-to-r from-slate-100 to-slate-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer border border-gray-200"
    >
      <div className="flex">
        <Avatar sx={{ bgcolor: "#f57c00", color: "#fff" }}>
          {contact.username[0].toUpperCase()}
        </Avatar>
        <div className="flex flex-col ml-3 justify-center">
          <h1 className="font-semibold text-gray-800 text-sm">
            {contact.username}
          </h1>
          <h1 className="text-xs text-gray-500">{contact.digitalNumber}</h1>
        </div>
      </div>
      <div>
        {unRead[contact.username] > 0 && (
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-1 -right-1 flex items-center justify-center">
              <div className="bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md ring-2 ring-white">
                {unRead[contact.username]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
