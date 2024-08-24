import React from 'react'

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import Profile from './Profile';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const NavigationBar = () => {
  return (
    <div className="rounded-xl bg-black flex flex-col p-4 justify-between items-center">
        <WhatsAppIcon htmlColor="white" fontSize="large" />
        <div className="flex flex-col space-y-8">
          <MailOutlineIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
          <InboxIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
          <NotificationsIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
          <DeleteIcon
            className="cursor-pointer hover:scale-125"
            htmlColor="white"
            fontSize="medium"
          />
        </div>
        <Profile/>
      </div>
  )
}

export default NavigationBar