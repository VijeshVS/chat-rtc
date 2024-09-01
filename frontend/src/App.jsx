import "./App.css";
import NavigationBar from "./components/NavigationBar";
import PeopleBar from "./components/PeopleBar";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";
import Register from "./components/Register";
import MessageSection from "./components/MessageSection";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isLoggedIn } from "./utils/auth";
import { getConversation } from "./utils/message";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authState,
  contactsAtom,
  filterContactAtom,
  groupChatAtom,
  messagesAtom,
  messagesLoadingAtom,
  selectContactAtom,
  userAtom,
} from "./store/store";
import GroupList from "./components/GroupList";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [socket, setSocket] = useState(null);

  const [contacts,setContacts] = useRecoilState(contactsAtom);
  const [selectedContact, setSelectedContact] =
    useRecoilState(selectContactAtom);

  const setMessages = useSetRecoilState(messagesAtom);
  const setFilteredContacts = useSetRecoilState(filterContactAtom);

  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authState);

  const [groupChat,setGroupChat] = useRecoilState(groupChatAtom)
  const [messagesLoading,setMessagesLoading] = useRecoilState(messagesLoadingAtom)

  useEffect(() => setFilteredContacts(contacts), [contacts]);
  useEffect(
    () =>
      setSelectedContact({
        username: "Name",
        digitalNumber: "12345",
      }),
    [auth]
  );
  useEffect(() => {
    if (auth && socket == null) {
      const new_socket = io(import.meta.env.VITE_BACKEND_URL, {
        transports: ["websocket"],
      });

      new_socket.on("connect", () => {
        setSocket(new_socket);
      });

      new_socket.on(user.username, (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        new_socket.off(user.username);
        new_socket.disconnect();
      };
    }
  }, [auth]);

  // Handle Authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = isLoggedIn(token).then(() => {
        setAuth(true);
        const decoded = jwtDecode(token);
        setUser(decoded);
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
    setMessages([])
    setMessagesLoading(true)
    if (auth && selectedContact.username != "Name") {
      const token = localStorage.getItem("token");
      getConversation(selectedContact.username, token).then(
        (res) => {
          setMessages(res.messages);
          setMessagesLoading(false)
        }
      ).catch((e)=>{
        setMessagesLoading(false)
      })
    }
    
  }, [selectedContact]);

  return (
    <div className={`flex space-x-2 bg-gray-300 h-screen px-8 py-4`}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <NavigationBar />

      <div className="flex flex-col space-y-2">
        <PeopleBar />
        {auth ? (
          groupChat?<GroupList />:<PeopleList />
        ) : (
          <div className="bg-white rounded-xl pl-2 no-scrollbar h-full "></div>
        )}
      </div>

      <div className="flex flex-col w-full space-y-2">
        <PeopleInfo />

        {auth ? (
          <>
            <MessageSection socket={socket} />
          </>
        ) : loginState ? (
          <Login setLoginState={setLoginState} />
        ) : (
          <Register setLoginState={setLoginState} />
        )}
      </div>
    </div>
  );
}

export default App;
