import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messagesAtom, selectContactAtom, userAtom } from "../store/store";
import TelegramIcon from "@mui/icons-material/Telegram";
import { ToastContainer, toast } from "react-toastify";

const SendBar = ({ socket }) => {
  const [msg, setMsg] = useState("");
  const user = useRecoilValue(userAtom);
  const selectedContact = useRecoilValue(selectContactAtom);
  const setMessages = useSetRecoilState(messagesAtom);

  const sendMessage = () => {
    if (msg.trim()) {
      const newMsg = {
        from: user.username,
        to: selectedContact.username,
        token: localStorage.getItem("token"),
        message: msg,
        sentTime: new Date(),
      };
      socket.emit("message", JSON.stringify(newMsg));
      setMsg("");
      setMessages((c) => [...c, newMsg]);
    } else {
      toast.error("Message cannot be empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent newline in the input field
      sendMessage();
    }
  };

  return (
    <div className="flex space-x-2 justify-between">
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Write a message..."
        className="p-2 w-full focus:outline-none border-2 border-gray-300 rounded-xl"
      />
      <div
        onClick={sendMessage}
        className="bg-gradient-to-r from-orange-400 to-orange-600 cursor-pointer hover:scale-105 p-3 rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center shadow-lg"
      >
        <TelegramIcon htmlColor="white" fontSize="medium" />
      </div>
    </div>
  );
};

export default SendBar;
