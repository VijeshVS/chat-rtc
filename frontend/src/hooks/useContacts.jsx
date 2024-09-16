import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState, contactsAtom, filterContactAtom, selectContactAtom, unReadMessagesAtom } from "../store/store";
import { useEffect } from "react";

export function useContacts(socket){
    const [contacts, setContacts] = useRecoilState(contactsAtom);
    const [selectedContact, setSelectedContact] = useRecoilState(selectContactAtom);
    const auth = useRecoilValue(authState)
    const setFilteredContacts = useSetRecoilState(filterContactAtom);
    const [unRead, setUnRead] = useRecoilState(unReadMessagesAtom);

    useEffect(() => setFilteredContacts(contacts), [contacts]);

    // When user logs out and logins to another account the contact selected in first account
    // should not appear in the second account
    useEffect(
        () =>
          setSelectedContact({
            username: "Name",
            digitalNumber: "12345",
          }),
        [auth]
      );

      useEffect(() => {
        // sort the contacts according to the no of unread
        if (unRead && socket && contacts) {
          setFilteredContacts((cc) => {
            const new_cons = [...cc];
            // let n = new_cons.length;
            // for (let i = 0; i < n; i++) {
            //   for (let j = i; j < n - i - 1; j++) {
            //     if (
            //       unRead[new_cons[j + 1].username] > unRead[new_cons[j].username]
            //     ) {
            //       let temp = new_cons[j + 1];
            //       new_cons[j + 1] = new_cons[j];
            //       new_cons[j] = temp;
            //     }
            //   }
            // }
            new_cons.sort((a, b) => (unRead[b.username] || 0) - (unRead[a.username] || 0));
            return new_cons;
          });
        }
      }, [unRead, contacts]);
}