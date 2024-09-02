import React from "react";
import MessageList from "./MessageList";
import SendBar from "./SendBar";
import { useRecoilValue } from "recoil";
import { authState, selectContactAtom } from "../store/store";

const MessageSection = ({ socket }) => {
  const auth = useRecoilValue(authState);
  const selected = useRecoilValue(selectContactAtom);

  return (
    <div className="bg-white flex flex-col h-full overflow-hidden rounded-xl p-4 justify-between">
      <MessageList />
      {auth && selected.username != "Name" ? (
        <SendBar socket={socket} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessageSection;
