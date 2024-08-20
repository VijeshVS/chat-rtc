import React from 'react'
import MessageList from "./MessageList";
import SendBar from "./SendBar";

const MessageSection = ({messages,selectedContact}) => {
  return (
    <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          <MessageList selectedContact={selectedContact} messages={messages}/>
          <SendBar/>
    </div> 
  )
}

export default MessageSection