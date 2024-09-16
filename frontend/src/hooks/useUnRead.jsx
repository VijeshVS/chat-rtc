import { useEffect } from "react";
import {
  messagesAtom,
  selectContactAtom,
  unReadMessagesAtom,
  userAtom,
} from "../store/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export function useUnRead(socket) {
  const [unRead, setUnRead] = useRecoilState(unReadMessagesAtom);
  const [selectedContact, setSelectedContact] =
    useRecoilState(selectContactAtom);
  const setMessages = useSetRecoilState(messagesAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      // Socket.io takes the context of the component when .on is called
      // so we need to off and on to get the lastest value of all components
      socket.off(user.username);

      socket.on(user.username, (msg) => {
        // If message is not from the selected guy add to unread list
        if (selectedContact.username != msg.from) {
          setUnRead((prevUnRead) => {
            const newUnRead = { ...prevUnRead };
            // If unread of that contact is not existing initialize to zero
            // If already present add one to it
            newUnRead[msg.from] = newUnRead[msg.from]
              ? newUnRead[msg.from] + 1
              : 1;
            return newUnRead;
          });
        }
        // Add message to the message list
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket, selectedContact]);

 
}
