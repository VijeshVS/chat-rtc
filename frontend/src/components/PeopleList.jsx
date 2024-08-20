import React from 'react'
import PeopleCard from "./PeopleCard";

const PeopleList = () => {
  return (
    <div className="bg-white rounded-xl pl-2 no-scrollbar h-full overflow-y-scroll">
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
          <PeopleCard/>
    </div>
  )
}

export default PeopleList