import React, { useEffect, useRef } from 'react'

const MessageList = ({messages,selectedContact,username}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef]);

  return (
    <div ref={scrollRef} className="flex flex-col space-y-2 h-[465px] py-1 px-2 overflow-y-scroll">
      {messages.map((m)=>{
        if(selectedContact.username == m.from && m.to == username){
          // left align
          return <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
          {m.message}
        </div>
        }
        else if(m.to == selectedContact.username && m.from == username){
          return  <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
          {m.message}
        </div>
        }
      })}    
    </div>
  )
}

export default MessageList