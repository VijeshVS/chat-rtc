import React from 'react'
import MessageList from "./MessageList";
import SendBar from "./SendBar";

const MessageSection = ({setMessages,messages,selectedContact,socket,username}) => {
  return (
    <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          {selectedContact.username == "X"?<></>:<MessageList selectedContact={selectedContact} messages={messages}/>}
          {selectedContact.username == "X"?<></>:<SendBar messages={messages} setMessages={setMessages} username={username} selectedContact={selectedContact} socket={socket}/>}
    </div> 
  )
}

export default MessageSection