import React from 'react'
import MessageList from "./MessageList";
import SendBar from "./SendBar";

const MessageSection = ({socket}) => {
  return (
    <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          <MessageList/>
          <SendBar socket={socket}/>
    </div> 
  )
}

export default MessageSection