import "./App.css";

import NavigationBar from "./components/NavigationBar";
import PeopleBar from "./components/PeopleBar";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Register";
import MessageSection from "./components/MessageSection";
import Login from "./components/Login";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { isLoggedIn } from "./utils/auth";
import { toast } from "react-toastify";
import { getConversation } from "./utils/message";

function App() {
  const [loginState,setLoginState] = useState(false);
  const [auth,setAuth] = useState(false);
  const [contacts,setContacts] = useState(JSON.parse(localStorage.getItem('contacts')))
  const [selectedContact,setSelectedContact] = useState({
    username: "X",
    digitalNumber: "000000"
  })
  const [messages,setMessages] = useState([]); 

  useEffect(()=>{
      const res = isLoggedIn(localStorage.getItem('token')).then((res)=>{
        setAuth(true)
      })
      toast.promise(res, {
        pending: "Authenticating......",
        success: "Success 👌",
        error: "Register/Login to continue",
    });
  },[])

  useEffect(()=>{
    if(auth){
      const res = getConversation(selectedContact.username,localStorage.getItem('token')).then((res)=>{
        setMessages(res.messages)
      })

      toast.promise(res, {
        pending: "Fetching messages......",
        success: "Messages fetched succesfully 👌",
        error: "Error receiving the messages",
    });
    }
  },[selectedContact])

  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
      
      <ToastContainer />
      <NavigationBar />
      <div className="flex flex-col space-y-2">
        <PeopleBar contacts={contacts} setContacts={setContacts} />
        <PeopleList setSelectedContact={setSelectedContact} contacts={contacts} />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <PeopleInfo selectedContact={selectedContact} />
        {auth?<></>:loginState?<Login setAuth={setAuth} setLoginState={setLoginState}/>:<Register setAuth={setAuth} setLoginState={setLoginState}/>}
        {auth?<MessageSection selectedContact={selectedContact} messages={messages}/>:<></>}
      </div>
    </div>
  );
}

export default App;
