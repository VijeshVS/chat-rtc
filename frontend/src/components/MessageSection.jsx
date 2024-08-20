import React from 'react'
import MessageList from "./MessageList";
import SendBar from "./SendBar";

const MessageSection = () => {
  return (
    <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          <MessageList/>
          <SendBar/>
    </div> 
  )
}

export default MessageSection