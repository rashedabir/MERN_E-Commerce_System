import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./component/Header";
import MainPage from "./screens/MainPage";
import MessengerCustomerChat from "react-messenger-customer-chat";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <DataProvider>
        <Router>
          <div className="container app">
            <Header />
            <MainPage />
          </div>
        </Router>
      </DataProvider>
      <MessengerCustomerChat pageId="103973174662277" appId="162221891965882" />
    </div>
  );
}

export default App;
