import React from 'react'
import SendIcon from "@mui/icons-material/Send";

export const MessageSend = () => {
  return (
    <div className="flex space-x-2 justify-between">
            <input
              type="text"
              placeholder="Write messages.."
              className="p-2 w-full focus:outline-none border-2 border-gray-300 rounded-xl"
            />
            <div className="bg-orange-500 cursor-pointer hover:scale-105 p-2 rounded-xl">
              <SendIcon htmlColor="white" fontSize="medium" />
            </div>
    </div>
  )
}
