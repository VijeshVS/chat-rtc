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
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  authState,
  contactsAtom,
  filterContactAtom,
  groupChatAtom,
  messagesAtom,
  messagesLoadingAtom,
  selectContactAtom,
  unReadMessagesAtom,
  userAtom,
} from "./store/store";
import GroupList from "./components/GroupList";
import NotSupported from "./components/NotSupported";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [socket, setSocket] = useState(null);

  const [contacts, setContacts] = useRecoilState(contactsAtom);
  const [selectedContact, setSelectedContact] =
    useRecoilState(selectContactAtom);

  const setMessages = useSetRecoilState(messagesAtom);
  const setFilteredContacts = useSetRecoilState(filterContactAtom);

  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authState);

  const [groupChat, setGroupChat] = useRecoilState(groupChatAtom);
  const [messagesLoading, setMessagesLoading] =
    useRecoilState(messagesLoadingAtom);
  const [unRead, setUnRead] = useRecoilState(unReadMessagesAtom);

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

  useEffect(() => {
    if (socket) {
      socket.off(user.username);
      socket.on(user.username, (msg) => {
        if (selectedContact.username != msg.from) {
          setUnRead((prevUnRead) => {
            const newUnRead = { ...prevUnRead };
            newUnRead[msg.from] = newUnRead[msg.from]
              ? newUnRead[msg.from] + 1
              : 1;
            return newUnRead;
          });
        }
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket, unRead, selectedContact]);

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
        success: "Welcome Back 🎉",
        error: "Register/Login to continue",
      });
    }
  }, []);

  // Fetch conversation when a contact is selected
  useEffect(() => {
    setMessages([]);
    setMessagesLoading(true);

    if (auth && selectedContact.username != "Name") {
      const token = localStorage.getItem("token");
      getConversation(selectedContact.username, token)
        .then((res) => {
          setMessages(res.messages);
          setUnRead((prevUnread) => {
            const new_unread = { ...prevUnread };
            new_unread[selectedContact.username] = 0;
            return new_unread;
          });
          setMessagesLoading(false);
        })
        .catch((e) => {
          setMessagesLoading(false);
        });
    }
  }, [selectedContact]);

  useEffect(() => {
    const new_unread = {};
    for (let i = 0; i < contacts.length; i++) {
      if (unRead[contacts[i].username]) {
        new_unread[contacts[i].username] = unRead[contacts[i].username];
      } else {
        new_unread[contacts[i].username] = 0;
      }
    }
    setUnRead(new_unread);
  }, [contacts]);

  useEffect(() => {
    // sort the contacts according to the no of unread
    if (unRead && socket && contacts) {
      setFilteredContacts((cc) => {
        const new_cons = [...cc];
        let n = new_cons.length;
        for (let i = 0; i < n; i++) {
          for (let j = i; j < n - i - 1; j++) {
            if (
              unRead[new_cons[j + 1].username] > unRead[new_cons[j].username]
            ) {
              let temp = new_cons[j + 1];
              new_cons[j + 1] = new_cons[j];
              new_cons[j] = temp;
            }
          }
        }
        return new_cons;
      });
    }
  }, [unRead, contacts]);

  return (
    <div>
      <div
        className={`lg:flex space-x-2 hidden bg-gray-300 h-screen px-8 py-4 `}
      >
        <ToastContainer
          position="top-right"
          autoClose={1500}
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
            groupChat ? (
              <GroupList />
            ) : (
              <PeopleList />
            )
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
      <NotSupported />
    </div>
  );
}

export default App;
