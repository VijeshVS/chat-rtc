import "./App.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function App() {
  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
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
        <AccountCircleIcon
          className="cursor-pointer hover:scale-105"
          htmlColor="white"
          fontSize="medium"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex py-4 rounded-xl bg-white flex-col">
          <div className="flex space-x-4 items-center px-3">
            <h1 className="text-lg font-semibold">Chat</h1>
            <div className="flex items-center border-2 px-2 py-2 rounded-2xl border-gray-400">
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none text-sm px-1"
              />
              <SearchIcon fontSize="small" htmlColor="#9ca3af" />
            </div>
            <div className="bg-orange-500 rounded-2xl p-1 cursor-pointer hover:scale-105">
              <AddIcon htmlColor="white" fontSize="medium" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl h-full">
          <h1 className="text-gray-400 text-sm px-3 pt-4">ALL</h1>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="bg-white p-4 rounded-xl flex justify-between">
          <div className="flex">
            <Avatar>V</Avatar>
            <div className="flex flex-col ml-2">
              <h1 className="text-sm font-bold">Vijesh Shetty</h1>
              <h1 className="text-sm text-gray-400">Online</h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-black text-sm py-2 px-5 font-semibold hover:scale-105 bg-white border-2 border-gray-400 rounded-3xl">
              Profile
            </button>
            <button className="text-white text-sm py-2 px-7 hover:scale-105 bg-black rounded-3xl">
              Call
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          <div className="flex flex-col space-y-2 h-[465px] py-1 px-2 overflow-y-scroll">
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-orange-500 text-white text-sm">
              hello vijesh how are you
            </div>
            <div className="p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  self-start bg-orange-500 text-white text-sm">
              i am fine jivesh. how you are doing
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
