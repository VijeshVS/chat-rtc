import "./App.css";


import { NavigationBar } from "../components/NavigationBar";
import { PeopleBar } from "../components/PeopleBar";
import { PeopleList } from "../components/PeopleList";
import { PeopleInfo } from "../components/PeopleInfo";
import { MessagesList } from "../components/MessagesList";
import { MessageSend } from "../components/MessageSend";

function App() {
  return (
    <div className="flex space-x-2 bg-gray-300 h-screen px-8 py-4">
      <NavigationBar/>
      <div className="flex flex-col space-y-2">
        <PeopleBar/>
        <PeopleList/>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <PeopleInfo/>
        <div className="bg-white flex flex-col h-full rounded-xl p-4 justify-between">
          <MessagesList/>
          <MessageSend/>
        </div>
      </div>
    </div>
  );
}

export default App;
