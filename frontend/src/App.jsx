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
  messagesAtom,
  selectContactAtom,
  userAtom,
} from "./store/store";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [socket, setSocket] = useState(null);

  const contacts = useRecoilValue(contactsAtom);
  const [selectedContact, setSelectedContact] =
    useRecoilState(selectContactAtom);

  const setMessages = useSetRecoilState(messagesAtom);
  const setFilteredContacts = useSetRecoilState(filterContactAtom);

  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authState);

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
    if (auth && selectedContact.username != "Name") {
      const token = localStorage.getItem("token");
      const res = getConversation(selectedContact.username, token).then(
        (res) => {
          setMessages(res.messages);
        }
      );

      toast.promise(res, {
        pending: "Fetching messages......",
        success: "Messages fetched successfully 👌",
        error: "Error receiving the messages",
      });
    }
  }, [selectedContact]);

  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
      <ToastContainer />
      <NavigationBar />

      <div className="flex flex-col space-y-2">
        <PeopleBar />
        {auth ? (
          <PeopleList />
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
