import React from 'react';
import PeopleCard from "./PeopleCard";
import { useRecoilValue } from 'recoil';
import { filterContactAtom } from '../store/store';

const PeopleList = () => {
  const contacts = useRecoilValue(filterContactAtom);

  return (
    <div className="bg-gray-50 rounded-xl p-4 h-full overflow-y-auto shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Contacts</h2>
      {contacts && contacts.length > 0 ? (
        contacts.map((c) => (
          <div key={c.digitalNumber} className="mb-4 last:mb-0">
            <PeopleCard contact={c} />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 flex mt-48 justify-center">
          No contacts found
        </div>
      )}
    </div>
  );
};

export default PeopleList;