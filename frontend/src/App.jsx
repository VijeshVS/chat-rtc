import "./App.css";
import NavigationBar from "./components/NavigationBar";
import PeopleBar from "./components/PeopleBar";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";
import Register from "./components/Register";
import MessageSection from "./components/MessageSection";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { isLoggedIn } from "./utils/auth";
import { getConversation } from "./utils/message";
import { io } from "socket.io-client";
import {jwtDecode} from "jwt-decode"; // Removed braces as jwtDecode is the default export
import 'react-toastify/dist/ReactToastify.css';
 

function App() {
  const [loginState, setLoginState] = useState(false);
  const [auth, setAuth] = useState(false);
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [selectedContact, setSelectedContact] = useState({
    username: "X",
    digitalNumber: "000000",
  });
  const [messages, setMessages] = useState([]); 
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);

  const [filteredContacts,setFilteredContacts] = useState([]);

  useEffect(()=>setFilteredContacts(contacts),[contacts])

  // Handle WebSocket connection
  useEffect(() => {
    if (auth && username && !socket) {
      const Ksocket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });
      
      Ksocket.on('connect', () => {
        setSocket(Ksocket);
      });

      Ksocket.on(username, (msg) => {   
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        Ksocket.off(username); 
        Ksocket.disconnect(); 
      };
    }
  }, [auth, username]); 

  // Handle Authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = isLoggedIn(token).then(() => {
        setAuth(true);
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      });

      toast.promise(res, {
        pending: "Authenticating......",
        success: "Authenticated 👌",
        error: "Register/Login to continue",
      });
    }
  }, []);

  // Fetch conversation when a contact is selected
  useEffect(() => {
    if (auth && selectedContact.username !== "X") {
      const token = localStorage.getItem('token');
      const res = getConversation(selectedContact.username, token).then((res) => {
        setMessages(res.messages);
      });

      toast.promise(res, {
        pending: "Fetching messages......",
        success: "Messages fetched successfully 👌",
        error: "Error receiving the messages",
      });
    }
  }, [auth, selectedContact]);

  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
      <ToastContainer />
      <NavigationBar />
      
      <div className="flex flex-col space-y-2">
        <PeopleBar setFilteredContacts={setFilteredContacts} contacts={contacts} setContacts={setContacts} />
        {auth ? <PeopleList setSelectedContact={setSelectedContact} contacts={filteredContacts} />:<div className="bg-white rounded-xl pl-2 no-scrollbar h-full "></div>}
      </div>
      
      <div className="flex flex-col w-full space-y-2">
        <PeopleInfo selectedContact={selectedContact} />

        {auth ? (
          <>
            <MessageSection setMessages={setMessages} username={username} socket={socket} selectedContact={selectedContact} messages={messages} />
          </>
        ) : (
          loginState ? (
            <Login setAuth={setAuth} setMainUsername={setUsername} setLoginState={setLoginState} />
          ) : (
            <Register setMainUsername={setUsername} setAuth={setAuth} setLoginState={setLoginState} />
          )
        )}
      </div>
    </div>
  );
}

export default App;
