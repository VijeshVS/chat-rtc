import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Avatar from '@mui/material/Avatar';
import { groupChatAtom, messagesAtom, messagesLoadingAtom, selectContactAtom, userAtom } from '../store/store';

const MessageList = () => {
  const scrollRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const selectedContact = useRecoilValue(selectContactAtom);
  const messages = useRecoilValue(messagesAtom);
  const [messagesLoading, setMessagesLoading] = useRecoilState(messagesLoadingAtom);
  const groupChat = useRecoilValue(groupChatAtom);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef]);

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name[0];
  };

  return (
    <div
      ref={scrollRef}
      className="flex flex-col space-y-3 py-2 px-4 overflow-y-scroll h-full rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scroll-smooth"
    >
      {messages.length === 0 ? selectedContact.username === "Name" ?
        <div className="flex justify-center items-center h-full text-neutral-600 text-lg">
          Select a contact to start messaging !!
        </div> :
        messagesLoading ? <div className="flex justify-center items-center h-full text-neutral-600 text-lg">
          Loading Messages.....
        </div> :
        <div className="flex justify-center items-center h-full text-neutral-600 text-lg">
          No messages yet. Start the conversation!
        </div>
        : (
          messages.map((m, index) => {
            let sentTime = "00:00 AM";
            const time = new Date(m.sentTime);
            if (m.sentTime)
              sentTime = time.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });

            const isSentByUser = m.to === selectedContact.username && m.from === user.username;
            const isReceivedByUser = selectedContact.username === m.from && m.to === user.username;

            return (
              <div key={index} className={`flex items-start ${isSentByUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {groupChat && (
                  <div className={`flex flex-col items-center ${isSentByUser ? 'ml-2' : 'mr-2'}`}>
                    <Avatar className="w-8 h-8">
                      {getInitials(isSentByUser ? user.username : m.from)}
                    </Avatar>
                    <span className="text-xs text-gray-600 mt-1">{isSentByUser ? user.username : m.from}</span>
                  </div>
                )}
                <div className={`flex flex-col max-w-xs ${isSentByUser ? (groupChat ? 'ml-2' : '') : (groupChat ? 'mr-2' : '')}`}>
                  <div className={`p-3 rounded-tr-2xl rounded-tl-2xl ${isSentByUser ? 'rounded-bl-2xl bg-blue-500 text-white' : 'rounded-br-2xl bg-gray-200 text-gray-900'} text-sm shadow-md`}>
                    {m.message}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 ${isSentByUser ? 'self-end' : ''}`}>{sentTime}</span>
                </div>
              </div>
            );
          })
        )}
    </div>
  );
};

export default MessageList;
