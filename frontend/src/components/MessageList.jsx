import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { messagesAtom, selectContactAtom, userAtom } from '../store/store';

const MessageList = () => {
  const scrollRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const selectedContact = useRecoilValue(selectContactAtom);
  const messages = useRecoilValue(messagesAtom);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef]);

  return (
    <div ref={scrollRef} className="flex flex-col space-y-3 py-2 px-4 overflow-y-scroll h-full rounded-lg">
      {messages.length === 0 ? selectedContact.username == "Name"?
        <div className="flex justify-center items-center h-full text-neutral-600 text-lg">
          Select a contact to start messaging !!
        </div>:
        <div className="flex justify-center items-center h-full text-neutral-600 text-lg">
        No messages yet. Start the conversation!
        </div>
       : (
        messages.map((m, index) => {
          if (selectedContact.username === m.from && m.to === user.username) {
            return (
              <div key={index} className="flex flex-col max-w-xs self-start">
                <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-gray-200 text-gray-900 text-sm shadow-md">
                  {m.message}
                </div>
                <span className="text-xs text-gray-500 mt-1">12:34 PM</span> {/* Dummy time */}
              </div>
            );
          } else if (m.to === selectedContact.username && m.from === user.username) {
            return (
              <div key={index} className="flex flex-col max-w-xs self-end">
                <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-blue-500 text-white text-sm shadow-md">
                  {m.message}
                </div>
                <span className="text-xs text-gray-500 mt-1 self-end">12:34 PM</span> {/* Dummy time */}
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

export default MessageList;
