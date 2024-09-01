import React from "react";
import Profile from "./Profile";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupChatAtom } from "../store/store";

const NavigationBar = () => {
  const [groupChat, setGroupChat] = useRecoilState(groupChatAtom);

  return (
    <div className="rounded-xl bg-black flex flex-col p-4 justify-between items-center">
      <ChatIcon htmlColor="white" fontSize="medium" />
      <div className="flex flex-col space-y-8">
        <div
          onClick={() => {
            if (groupChat) setGroupChat(false);
          }}
        >
          <PersonIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
        </div>
        {/* <div
          onClick={() => {
            if (!groupChat) setGroupChat(true);
          }}
        >
          <GroupIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
        </div> */}
      </div>
      <Profile />
    </div>
  );
};

export default NavigationBar;
