import "./App.css";

import NavigationBar from "./components/NavigationBar";
import PeopleBar from "./components/PeopleBar";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";

import Register from "./components/Register";
import MessageSection from "./components/MessageSection";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [loginState,setLoginState] = useState(false);
  const [auth,setAuth] = useState(false);

  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
      <NavigationBar />
      <div className="flex flex-col space-y-2">
        <PeopleBar />
        <PeopleList />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <PeopleInfo />
        {auth?<></>:loginState?<Login setLoginState={setLoginState}/>:<Register setLoginState={setLoginState}/>}
        {auth?<MessageSection/>:<></>}
      </div>
    </div>
  );
}

export default App;
