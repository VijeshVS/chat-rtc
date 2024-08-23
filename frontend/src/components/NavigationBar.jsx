import React from 'react'

import VerifiedIcon from "@mui/icons-material/Verified";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import Profile from './Profile';

const NavigationBar = ({setAuth}) => {
  return (
    <div className="rounded-xl bg-black flex flex-col p-4 justify-between">
        <VerifiedIcon htmlColor="#EC592B" fontSize="medium" />
        <div className="flex flex-col space-y-8">
          <MailOutlineIcon
            className="cursor-pointer hover:scale-105"
            htmlColor="white"
            fontSize="medium"
          />
          <InboxIcon
            className="cursor-pointer hover:scale-105"
            htmlColor="white"
            fontSize="medium"
          />
          <NotificationsIcon
            className="cursor-pointer hover:scale-105"
            htmlColor="white"
            fontSize="medium"
          />
          <DeleteIcon
            className="cursor-pointer hover:scale-105"
            htmlColor="white"
            fontSize="medium"
          />
        </div>
        <Profile setAuth={setAuth}/>
      </div>
  )
}

export default NavigationBar