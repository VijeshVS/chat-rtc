import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState, messagesAtom, userAtom } from "../store/store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(){
    const auth = useRecoilValue(authState);
    const user = useRecoilValue(userAtom);
    const [socket, setSocket] = useState(null);
    const setMessages = useSetRecoilState(messagesAtom);

    useEffect(() => {
        if (auth && socket == null) {
          const new_socket = io(import.meta.env.VITE_BACKEND_URL, {
            transports: ["websocket"],
          });
    
          new_socket.on("connect", () => {
            setSocket(new_socket);
          });
    
          new_socket.off(user.username);
          new_socket.on(user.username, (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          });
    
          new_socket.on("disconnect", () => {
            setSocket(null);
          });
    
          return () => {
            new_socket.off(user.username);
            new_socket.disconnect();
          };
        }
      }, [auth]);

      return socket;
}