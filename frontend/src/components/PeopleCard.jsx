import { Avatar } from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { selectContactAtom } from '../store/store';

const PeopleCard = ({ contact }) => {
  const setSelectedContact = useSetRecoilState(selectContactAtom);

  return (
    <div
      onClick={() => setSelectedContact(contact)}
      className="flex items-center space-x-3 py-4 pl-3 pr-4 rounded-lg hover:bg-gradient-to-r from-slate-100 to-slate-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer border border-gray-200"
    >
      <Avatar sx={{ bgcolor: '#f57c00', color: '#fff' }}>{contact.username[0].toUpperCase()}</Avatar>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-gray-800 text-sm">{contact.username}</h1>
        <h1 className="text-xs text-gray-500">{contact.digitalNumber}</h1>
      </div>
    </div>
  );
};

export default PeopleCard;
