import React from 'react'
import PeopleCard from "./PeopleCard";

const PeopleList = ({contacts,setSelectedContact}) => {
  return (
    <div className="bg-white rounded-xl pl-2 no-scrollbar h-full overflow-y-scroll">
      {contacts.map((c)=><PeopleCard key={c.digitalNumber} setSelectedContact={setSelectedContact} contact={c}/>)}
    </div>
  )
}

export default PeopleList