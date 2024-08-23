import React, { useState } from 'react'
import SendIcon from "@mui/icons-material/Send";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { messagesAtom, selectContactAtom, userAtom } from '../store/store';

const SendBar = ({socket}) => {
  const [msg,setMsg] = useState("")
  const user = useRecoilValue(userAtom);
  const selectedContact = useRecoilValue(selectContactAtom);
  const setMessages = useSetRecoilState(messagesAtom);

  return (
    <div className="flex space-x-2 justify-between">
            <input value={msg}
              onChange={(e)=>setMsg(e.target.value)}
              type="text"
              placeholder="Write messages.."
              className="p-2 w-full focus:outline-none border-2 border-gray-300 rounded-xl"
            />
            <div onClick={()=>{
              const newMsg = {
                from:user.username,
                to:selectedContact.username,
                token: localStorage.getItem('token'),
                message: msg
              }
              socket.emit('message',JSON.stringify(newMsg))
              setMsg("")
              setMessages((c)=>[...c,newMsg])
            }} className="bg-orange-500 cursor-pointer hover:scale-105 p-2 rounded-xl">
              <SendIcon htmlColor="white" fontSize="medium" />
            </div>
          </div>
  )
}

export default SendBar