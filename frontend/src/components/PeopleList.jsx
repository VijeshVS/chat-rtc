import React from 'react'
import PeopleCard from "./PeopleCard";
import { useRecoilValue } from 'recoil';
import { contactsAtom, filterContactAtom } from '../store/store';

const PeopleList = () => {
  const contacts = useRecoilValue(filterContactAtom);
  
  return (
    <div className="bg-white rounded-xl pl-2 no-scrollbar h-full overflow-y-scroll">
      {contacts.map((c)=><PeopleCard key={c.digitalNumber} contact={c}/>)}
    </div>
  )
}

export default PeopleList