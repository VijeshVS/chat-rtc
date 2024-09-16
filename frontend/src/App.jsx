import "./App.css";
import NavigationBar from "./components/NavigationBar";
import PeopleBar from "./components/PeopleBar";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";
import Register from "./components/Register";
import MessageSection from "./components/MessageSection";
import Login from "./components/Login";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotSupported from "./components/NotSupported";
import useSocket from "./hooks/useSocket";
import { useContacts } from "./hooks/useContacts";
import { useAuth } from "./hooks/useAuth";
import { useMessages } from "./hooks/useMessages";
import { useUnRead } from "./hooks/useUnRead";

function App() {
  const [loginState, setLoginState] = useState(false);
  const auth = useAuth();
  const socket = useSocket();
  useMessages();
  useContacts(socket);
  useUnRead(socket);
  
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

        {auth?<div className="flex flex-col space-y-2">
          <PeopleBar />
          <PeopleList/>
        </div>:<></>}

        <div className="flex flex-col w-full space-y-2">
          {auth?<PeopleInfo />:<></>}

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
