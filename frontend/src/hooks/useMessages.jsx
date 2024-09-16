import { useEffect } from "react";
import { authState, messagesAtom, messagesLoadingAtom, selectContactAtom, unReadMessagesAtom } from "../store/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getConversation } from "../utils/message";

export function useMessages(){
    const [messagesLoading, setMessagesLoading] = useRecoilState(messagesLoadingAtom);
    const [unRead, setUnRead] = useRecoilState(unReadMessagesAtom);
    const setMessages = useSetRecoilState(messagesAtom);
    const [selectedContact, setSelectedContact] = useRecoilState(selectContactAtom);
    const auth = useRecoilValue(authState);

    useEffect(() => {
        setMessages([]);
        setMessagesLoading(true);
    
        if (auth && selectedContact.username != "Name") {
          const token = localStorage.getItem("token");
          getConversation(selectedContact.username, token)
            .then((res) => {
              setMessages(res.messages);
              setUnRead((prevUnread) => {
                const new_unread = { ...prevUnread };
                new_unread[selectedContact.username] = 0;
                return new_unread;
              });
              setMessagesLoading(false);
            })
            .catch((e) => {
              setMessagesLoading(false);
            });
        }
      }, [selectedContact]);

}